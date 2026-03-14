from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Existing models
from .user import User
from .vessel import Vessel
from .ocean_data import OceanData
from .prediction import Prediction
from .navigation import Navigation
from .catch_log import CatchLog

# New MDM model
from .mdm_operation import MdmOperation

