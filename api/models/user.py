from sqlalchemy import func
from .. import db

class Users(db.Model):
    id = db.Column(
        db.Integer,
        primary_key=True
    )
    fName = db.Column(
        db.String(16),
        nullable = False
    )
    lName = db.Column(
        db.String(16),
        nullable = False
    )
    email = db.Column(
        db.String(32),
        unique = True,
        nullable = False
    )
    password = db.Column(
        db.String(64),
        nullable = False
    )
    created_at = db.Column(
        db.DateTime(timezone=True),
        server_default = func.now(),
        nullable = False
    )