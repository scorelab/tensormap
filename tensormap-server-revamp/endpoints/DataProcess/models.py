from shared.utils import get_db_ref


db = get_db_ref()


class DataProcess(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    target = db.Column(db.String(10), nullable=False)
    file_id = db.Column(db.Integer, db.ForeignKey('data_file.id'))
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
