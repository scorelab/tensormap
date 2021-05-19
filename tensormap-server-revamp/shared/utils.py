from flask_sqlalchemy import SQLAlchemy
import os


class DB:
    db_ref = None

    def __init__(self):
        DB.db_ref = SQLAlchemy()


def get_db_ref():
    if not DB.db_ref:
        DB()
    return DB.db_ref


def create_db_connection():
    return "mysql+pymysql://" + os.getenv("db_user") + ":" + os.getenv("db_password") + "@" + \
           os.getenv("db_host") + "/" + os.getenv("db_name")


def save_one_record(record):
    db = get_db_ref()
    db.session.add(record)
    db.session.commit()


def save_multiple_records(records):
    db = get_db_ref()
    for record in records:
        db.session.add(record)
    db.session.commit()
