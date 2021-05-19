from flask import Flask
from setup.urls import MainURLRegister
from setup.settings import SettingUp
from shared.services.config import get_configs
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
configs = get_configs()

app = Flask(__name__)
CORS(app)

MainURLRegister(app=app)
SettingUp(app=app)

if __name__ == '__main__':
    app.run(host=configs['api']['host'], port=configs['api']['port'], debug=configs['app']['debug'])
