from shared.utils import get_db_ref

db = get_db_ref()


class ModelBasic(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    model_name = db.Column(db.String(50), nullable=False,unique=True)
    model_dataset = db.Column(db.Integer, db.ForeignKey('data_file.id'))
    model_type = db.Column(db.Integer, nullable=False)
    target_class = db.Column(db.String(50), nullable=False)
    configs = db.relationship('ModelConfigs', cascade='all,delete', backref='model')
    results = db.relationship('ModelResults', cascade='all,delete', backref='model')
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())


class ModelConfigs(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    parameter = db.Column(db.String(50), nullable=False)
    value = db.Column(db.String(50), nullable=False)
    model_id = db.Column(db.Integer, db.ForeignKey('model_basic.id'))
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())


class ModelResults(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    model_id = db.Column(db.Integer, db.ForeignKey('model_basic.id'))
    epoc = db.Column(db.Integer, nullable=False)
    iteration = db.Column(db.Integer, nullable=False)
    metric = db.Column(db.String(50), nullable=False)
    value = db.Column(db.Float, nullable=False)
