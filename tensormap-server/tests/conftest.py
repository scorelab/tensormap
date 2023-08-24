import os
from dotenv import load_dotenv
import pytest
import pymysql
import urllib.parse
from flask_migrate import Migrate, upgrade
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from setup.test_settings import SettingUp
from setup.urls import MainURLRegister
from werkzeug.utils import secure_filename
from shared.constants import *
import shutil
from shared.services.config import get_configs
from endpoints.DataUpload.models import DataFile

load_dotenv()
db = SQLAlchemy()
configs = get_configs()
db_name = 'tensormap_test_db'

@pytest.fixture(scope='session')
def app():
    # Basic setup of a new Flask App
    flask_app = Flask(__name__)
    flask_app.config['TESTING'] = True
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://'+ os.getenv('db_user')+ ':'+ os.getenv('db_password')+ '@'+ os.getenv('db_host') + '/'+ db_name
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Setting up for TensorMap
    MainURLRegister(app=flask_app)
    SettingUp(app=flask_app)

    # Create a test database and once the tests are complete delete the database
    db.init_app(flask_app)
    with flask_app.app_context():
        init_test_database()
        migrate = Migrate(flask_app, db)
        upgrade() 
        yield flask_app
        db.session.remove()
        db.drop_all()
        db.engine.dispose()
        destroy_test_database()

@pytest.fixture(scope='session')
def client(app):
    return app.test_client() 

def init_test_database():
    # Create a test database
    connection = pymysql.connect(
        host=os.getenv('db_host').split(":")[0],
        user= os.getenv('db_user'),
        password=urllib.parse.unquote('ANTHeRAX%4099')
    )
    cursor = connection.cursor()
    cursor.execute(f"DROP DATABASE IF EXISTS {db_name}")
    cursor.execute(f"CREATE DATABASE {db_name}")
    cursor.close()
    connection.close()


def destroy_test_database():
    connection = pymysql.connect(
        host=os.getenv('db_host').split(":")[0],
        user= os.getenv('db_user'),
        password=urllib.parse.unquote(os.getenv('db_password'))
    )
    cursor = connection.cursor()

    # Terminate active connections to the database
    cursor.execute(f"SELECT * FROM information_schema.processlist WHERE db='{db_name}'")
    for row in cursor.fetchall():
        kill_query = f"KILL {row[0]}"
        cursor.execute(kill_query)
    cursor.execute(f"DROP DATABASE {db_name}")
    connection.commit()  # Commit any outstanding changes
    cursor.close()
    connection.close()

@pytest.fixture(scope="session")
def db_session(app):
    with app.app_context():
        yield db.session
        db.session.rollback()


@pytest.fixture(scope="session")
def add_sample_file():
    # This file is stored inside tests folder
    filename = 'test.csv'
    
    # Convert the filename and copy it into the data folder
    file_name = secure_filename(filename.lower())
    upload_folder = configs['api']['upload']['folder']
    destination_path = os.path.join(upload_folder, file_name)
    shutil.copy("tests/"+filename,os.path.join(upload_folder, file_name))
    
    # Store the file in the Database aswell
    file_name_db = secure_filename(filename.rsplit('.', 1)[0].lower())
    file_type_db = filename.rsplit('.', 1)[1].lower()
    data = DataFile(file_name=file_name_db, file_type=file_type_db)
    db.session.add(data)
    db.session.commit()
    
    yield
    # Once test is complete remove the file from the data directory and remove the record from the db
    os.remove(destination_path)
    db.session.delete(data)
    db.session.commit()