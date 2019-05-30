from flask import Flask
from flask_socketio import SocketIO

socketio = SocketIO()

def create_app(debug=False):
    
    app = Flask(__name__)
    app.debug = debug
    #test key
    app.config['SECRET_KEY'] = 'secret'

    from .resources import dl_blueprint
    app.register_blueprint(dl_blueprint)

    socketio.init_app(app)
    return app