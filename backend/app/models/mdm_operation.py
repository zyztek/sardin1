from . import db
from datetime import datetime
from enum import Enum

class MdmType(Enum):
    KNOX = "knox"
    PAYJOY = "payjoy"
    GENERIC = "generic"

class MdmOperation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    device_model = db.Column(db.String(100))
    brand = db.Column(db.String(50))
    mdm_type = db.Column(db.Enum(MdmType))
    package_name = db.Column(db.String(200))
    success = db.Column(db.Boolean, default=False)
    error = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    ip_address = db.Column(db.String(45))  # For compliance logging

    def __repr__(self):
        return f'<MdmOperation {self.device_model}: {self.success}>'

