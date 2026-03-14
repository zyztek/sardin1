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
            results.append({"command": cmd, "result": self.execute_adb_command(cmd)})
        return results
