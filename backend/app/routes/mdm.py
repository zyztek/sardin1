from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.mdm_service import MDMService
from ..models import db

mdm_bp = Blueprint('mdm', __name__)
mdm_service = MDMService()

@mdm_bp.route('/diagnose', methods=['GET'])
def diagnose():
    return jsonify(mdm_service.diagnose_device()), 200

@mdm_bp.route('/unlock', methods=['POST'])
def unlock():
    package = request.json.get('package')
    return jsonify(mdm_service.remove_package(package)), 200

@mdm_bp.route('/payjoy-remove', methods=['POST'])
@jwt_required()
def payjoy_remove():
    data = request.json
    package = data.get('package')
    result = mdm_service.payjoy_remove(package)
    return jsonify(result), 200

@mdm_bp.route('/backup', methods=['POST'])
@jwt_required()
def backup():
    result = mdm_service.backup_data()
    return jsonify(result), 200

@mdm_bp.route('/verify/<package>', methods=['GET'])
@jwt_required()
def verify(package):
    result = mdm_service.verify_removal(package)
    return jsonify(result), 200

@mdm_bp.route('/stats', methods=['GET'])
@jwt_required()
def stats():
    return jsonify(mdm_service.get_stats()), 200

@mdm_bp.route('/ai-fix', methods=['POST'])
@jwt_required()
def ai_fix():
    data = request.json
    return jsonify({"results": mdm_service.ai_assisted_unlock(data.get('device_info'), data.get('last_error'))}), 200
