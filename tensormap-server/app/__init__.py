from flask import Flask
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

socketio = SocketIO()
db = SQLAlchemy()

def create_app(debug=False):
    
    app = Flask(__name__)
    app.debug = debug
    app.config['SECRET_KEY'] = 'secret'#test key
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:pass@localhost/tensormap"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    from .resources import main
    app.register_blueprint(main)

    socketio.init_app(app)
    db.init_app(app)
    CORS(app, expose_headers='Authorization', support_credentials=True)
    return app