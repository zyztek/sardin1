import subprocess
from flask import current_app
from ..models import db, MdmOperation
from .gemini_service import GeminiService
from datetime import datetime

class MDMService:
    def __init__(self):
        self.gemini = GeminiService()
        self.config = current_app.config if current_app else {}

    def execute_adb_command(self, command):
        try:
            if not command.startswith('adb'): command = f"adb {command}"
            process = subprocess.Popen(command.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            stdout, stderr = process.communicate()
            return {"success": process.returncode == 0, "output": stdout, "error": stderr}
        except Exception as e:
            return {"success": False, "output": None, "error": str(e)}

    def diagnose_device(self):
        model = self.execute_adb_command("shell getprop ro.product.model")
        brand = self.execute_adb_command("shell getprop ro.product.brand")
        packages = self.execute_adb_command("shell pm list packages -f | grep -E 'knox|payjoy|mdm'")
        payjoy_packages = ["com.payjoy.device", "com.payjoy.mdm", "com.samsung.knox"]
        detected_mdm = [p for p in payjoy_packages if p in packages.get("output", "")]
        is_samsung = "samsung" in brand.get("output", "").lower()
        return {
            "model": model.get("output", "").strip(),
            "brand": brand.get("output", "").strip(),
            "packages": packages.get("output", "").strip(),
            "mdm_detected": detected_mdm,
            "is_samsung": is_samsung,
            "mdm_type": "payjoy" if "payjoy" in str(packages.get("output", "")) else "knox" if "knox" in str(packages.get("output", "")) else "none"
        }

    def remove_package(self, package_name):
        return self.execute_adb_command(f"shell pm uninstall --user 0 {package_name}")

    def ai_assisted_unlock(self, device_info, last_error):
        suggested_commands = self.gemini.get_unlock_commands(device_info, last_error)
        results = []
        for cmd in suggested_commands:
            result = self.execute_adb_command(cmd)
            results.append({"command": cmd, "result": result})
        self.log_operation(device_info.get('model'), 'ai_unlock', True, '', current_user.id if current_user else None)
        return results

    def backup_data(self):
        \"\"\"Backup key data before removal.\"""
        backup = self.execute_adb_command("shell pm backup -apk -obb -shared -all -f /sdcard/mdm_backup.ab")
        return backup

    def verify_removal(self, package_name):
        \"\"\"Verify package removal.\"""
        check = self.execute_adb_command(f"shell pm list packages | grep {package_name}")
        success = package_name not in check.get("output", "")
        return {"success": success, "output": check.get("output", "")}

    def payjoy_remove(self, package_name):
        if not self.config.get('MEXICO_COMPLIANCE'):
            return {"success": False, "error": "Mexico compliance required"}
        backup = self.backup_data()
        remove = self.remove_package(package_name)
        verify = self.verify_removal(package_name)
        self.log_operation(package_name, 'payjoy_remove', remove['success'], str(verify))
        return {"backup": backup, "remove": remove, "verify": verify}

    def log_operation(self, device_model, operation_type, success, error, user_id=None):
        op = MdmOperation(
            device_model=device_model,
            mdm_type=operation_type,
            success=success,
            error=error,
            user_id=user_id
        )
        db.session.add(op)
        db.session.commit()
        return op

    def get_stats(self):
        from sqlalchemy import func
        total = MdmOperation.query.count()
        success = MdmOperation.query.filter_by(success=True).count()
        mexico = MdmOperation.query.filter(MdmOperation.device_model.ilike('%mx%')).count()  # Approx
        return {"total": total, "success_rate": success/total*100 if total else 0, "mexico_ops": mexico}
