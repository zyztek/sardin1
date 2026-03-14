#!/usr/bin/env python3
from backend.app import create_app
from backend.app.models import db, MdmOperation  # after model created

app = create_app()
with app.app_context():
    db.create_all()
    print('DB initialized for MDM')

