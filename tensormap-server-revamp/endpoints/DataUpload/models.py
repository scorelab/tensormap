from shared.utils import get_db_ref

db = get_db_ref()


class DataFile(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    file_name = db.Column(db.String(100), nullable=False)
    file_type = db.Column(db.String(10), nullable=False)
    target = db.relationship("DataProcess", uselist=False, cascade="all,delete", backref="file")
    associated_model = db.relationship("ModelBasic", backref="file")
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
