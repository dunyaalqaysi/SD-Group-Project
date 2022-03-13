from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()
def create_app():
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_pyfile('config.py')
    with app.app_context():
        from . import server
        CORS(app)
        # db.init_app(app)
        # db.drop_all()
        # db.create_all()  # Create sql tables for our data models
        return app