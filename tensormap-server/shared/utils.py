import os

from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy


class DB:
    db_ref = None

    def __init__(self):
        DB.db_ref = SQLAlchemy()


class SOK:
    socket_ref = None

    def __init__(self):
        SOK.socket_ref = SocketIO(cors_allowed_origins="*")


def get_db_ref():
    """
    This function is used to refer database object in anywhere in the project

    :return: database object
    """
    if not DB.db_ref:
        DB()
    return DB.db_ref


def get_socket_ref():
    if not SOK.socket_ref:
        SOK()
    return SOK.socket_ref


def create_db_connection():
    return (
        "mysql+pymysql://"
        + os.getenv("db_user")
        + ":"
        + os.getenv("db_password")
        + "@"
        + os.getenv("db_host")
        + "/"
        + os.getenv("db_name")
    )


def save_one_record(record):
    """
    This function is used to save one record to db

    :param record: one record as model object
    """
    db = get_db_ref()
    db.session.add(record)
    db.session.commit()


def save_multiple_records(records):
    """
    This function is used to save multiple records to db at once

    :param records: multiple records as relevant model object array
    """
    db = get_db_ref()
    for record in records:
        db.session.add(record)
    db.session.commit()


def delete_one_record(record):
    """
    This function is used to delete one record to db

    :param record: one record as model object
    """
    db = get_db_ref()
    db.session.delete(record)
    db.session.commit()
