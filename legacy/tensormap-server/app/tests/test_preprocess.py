import os
import unittest

from flask import Flask
from flask_cors import CORS, cross_origin
from flask_session import Session
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy

socketio = SocketIO()
db = SQLAlchemy()
sess = Session()
TEST_DB = "test"
debug = True


class PreprocessingTests(unittest.TestCase):

    ###########################
    #### Setup / Teardown  ####
    ###########################
    def setUp(self):
        app = Flask(__name__)
        app.debug = debug
        app.config["SESSION_TYPE"] = "filesystem"
        app.config["SECRET_KEY"] = "secret"
        app.config["USE_PERMANENT_SESSION"] = True
        # app.config['SECRET_KEY'] = os.urandom(25)
        app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:pass@localhost/tensormap"
        app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

        from ..resources import main

        app.register_blueprint(main)

        socketio.init_app(app)
        db.init_app(app)
        sess.init_app(app)
        CORS(app, expose_headers="Authorization", support_credentials=True)
        socketio.run(app)

    def tearDown(self):
        pass

    ###############
    #### Tests ####
    ###############

    def test_default_route(self):
        response = self.app.get("/", follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_visualization_route(self):
        response = self.app.get("/visualizeData", follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_addrow_route(self):
        response = self.app.get("/addRow", follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, "Done")


def runTests():
    unittest.main()


if __name__ == "__main__":
    unittest.main()
