from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from setup.settings import SettingUp
from setup.urls import MainURLRegister
from shared.services.config import get_configs
from shared.utils import get_socket_ref

load_dotenv()
configs = get_configs()

app = Flask(__name__)

MainURLRegister(app=app)
SettingUp(app=app)
CORS(app)

if __name__ == "__main__":
    socketio = get_socket_ref()
    socketio.run(app)
