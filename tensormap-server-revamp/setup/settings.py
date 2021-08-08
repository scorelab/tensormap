from shared.utils import get_db_ref, create_db_connection, get_socket_ref
from shared.services.config import get_configs
from flask_migrate import Migrate
import os

configs = get_configs()


"""
All the application related settings handle through here
"""


class SettingUp:

    def __init__(self, app):
        self.app = app
        self.app.config['SECRET_KEY'] = os.getenv("secret_key")
        self.app.host = configs['api']['host']
        self.app.port = configs['api']['port']
        self.app.debug = configs['app']['debug']
        self.file_setup()
        self.database_setup()
        self.swagger_setup()
        self.socketio_setup()

    def swagger_setup(self):
        pass

    def file_setup(self):
        self.app.config['UPLOAD_FOLDER'] = configs['api']['upload']['folder']
        self.app.config['MAX_CONTENT_LENGTH'] = 200 * 1024 * 1024

    def database_setup(self):
        connection = create_db_connection()

        self.app.config['SQLALCHEMY_DATABASE_URI'] = connection
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        db = get_db_ref()
        db.init_app(self.app)
        migrate = Migrate(self.app, db)

    def socketio_setup(self):
        socketio = get_socket_ref()
        socketio.init_app(self.app)


