from shared.utils import get_db_ref, create_db_connection
import os


class SettingUp:

    def __init__(self, app):
        self.app = app
        self.app.config['SECRET_KEY'] = os.getenv("secret_key")
        self.database_setup()
        self.swagger_setup()

    def swagger_setup(self):
        pass

    def database_setup(self):
        connection = create_db_connection()

        self.app.config['SQLALCHEMY_DATABASE_URI'] = connection
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        db = get_db_ref()
        db.init_app(self.app)
        with self.app.app_context():
            db.create_all()
