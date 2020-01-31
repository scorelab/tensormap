from flask import Flask
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_session import Session
import os

socketio = SocketIO()
db = SQLAlchemy()
sess = Session()

def create_app(debug=False):
    
    app = Flask(__name__)
    app.debug = debug
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['SECRET_KEY'] = 'secret'
    app.config['USE_PERMANENT_SESSION'] = True
    # app.config['SECRET_KEY'] = os.urandom(25)
<<<<<<< HEAD
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:Niteshmaha1@@localhost/tensormap"
=======
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:pass@localhost/tensormap"
>>>>>>> f4680c217941cae3990de591426d28ab38f6751d
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    from .resources import main
    app.register_blueprint(main)

    socketio.init_app(app)
    db.init_app(app)
    sess.init_app(app)
    CORS(app, expose_headers='Authorization', support_credentials=True)
<<<<<<< HEAD
    return app
=======
    return app
>>>>>>> f4680c217941cae3990de591426d28ab38f6751d
