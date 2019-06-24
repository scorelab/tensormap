from ... import db
from sqlalchemy.dialects.mysql import VARCHAR, BLOB, INTEGER,TEXT, JSON

class dataset(db.Model):
    id = db.Column(VARCHAR(50),primary_key=True)
    filePath = db.Column(VARCHAR(50))
    name = db.Column(VARCHAR(50))
    fileFormat = db.Column(VARCHAR(50))

    def __init__(self, name, filePath, fileFormat):
        self.name = name
        self.filePath = filePath
        self.fileFormat = fileFormat