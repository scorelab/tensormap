from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from setup.settings import SettingUp
from setup.urls import MainURLRegister
from shared.services.config import get_configs
from shared.utils import get_socket_ref

# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt

load_dotenv()
configs = get_configs()

app = Flask(__name__)

# app.config['SECRET_KEY'] = '123456789'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
# app.config['db_name'] = 'tensormap_mysql'
# app.config['db_host'] = 'localhost'
# app.config['db_password'] = '123456789'
# app.config['db_user'] = 'tensormap_user'
#
# db = SQLAlchemy(app)
# bcrypt = Bcrypt(app)
# db.create_all()

MainURLRegister(app=app)
SettingUp(app=app)
CORS(app)

if __name__ == '__main__':
    socketio = get_socket_ref()
    socketio.run(app)
