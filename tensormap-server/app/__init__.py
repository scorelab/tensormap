from flask import Flask
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy

socketio = SocketIO()
db = SQLAlchemy()

def create_app(debug=False):

    app = Flask(__name__)
    app.debug = debug
    app.config['SECRET_KEY'] = 'secret'#test key
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://orionpax:1111@localhost/tensormap"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    from .resources import main
    app.register_blueprint(main)

    socketio.init_app(app)
    db.init_app(app)
    return app
