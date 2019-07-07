from ... import db
from sqlalchemy.dialects.mysql import VARCHAR, BLOB, INTEGER,TEXT, JSON

class dataset(db.Model):
    id = db.Column(INTEGER, primary_key=True)
    filePath = db.Column(VARCHAR(1000))
    name = db.Column(VARCHAR(50))
    fileFormat = db.Column(VARCHAR(50))

    def __init__(self, name, filePath, fileFormat):
        self.name = name
        self.filePath = filePath
        self.fileFormat = fileFormat

    def serialize(self):
        return  {
            'id': self.id,
            'name': self.name,
            'filePath': self.filePath,
            'fileFormat': self.fileFormat
        }