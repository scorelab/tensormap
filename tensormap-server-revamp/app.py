from flask import Flask
from setup.urls import MainURLRegister
from setup.settings import SettingUp
from shared.services.config import get_configs
from shared.utils import get_socket_ref
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
configs = get_configs()

app = Flask(__name__)

MainURLRegister(app=app)
SettingUp(app=app)
CORS(app)

if __name__ == '__main__':
    socketio = get_socket_ref()
    socketio.run(app)
