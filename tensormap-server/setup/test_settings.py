import os

from shared.services.config import get_configs
from shared.utils import get_socket_ref

configs = get_configs()


"""
All the application related settings handle through here
"""


class SettingUp:
    def __init__(self, app):
        self.app = app
        self.app.config['SECRET_KEY'] = os.getenv('secret_key')
        self.app.host = configs['api']['host']
        self.app.port = configs['api']['port']
        self.app.debug = configs['app']['debug']
        self.file_setup()
        self.swagger_setup()
        self.socketio_setup()

    def swagger_setup(self):
        pass

    def file_setup(self):
        self.app.config['UPLOAD_FOLDER'] = configs['api']['upload']['folder']
        self.app.config['MAX_CONTENT_LENGTH'] = 200 * 1024 * 1024

    def socketio_setup(self):
        socketio = get_socket_ref()
        socketio.init_app(self.app)
