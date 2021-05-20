from shared.utils import get_db_ref


db = get_db_ref()


class DataFile(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    file_name = db.Column(db.String(100))
    file_type = db.Column(db.String(10))
