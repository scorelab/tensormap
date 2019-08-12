from ... import db
from sqlalchemy.dialects.mysql import VARCHAR, BLOB, INTEGER,TEXT, JSON

class dataset(db.Model):
    id = db.Column(INTEGER, primary_key=True)
    filename = db.Column(VARCHAR(50))
    filePath = db.Column(VARCHAR(1000))
    fileFormat = db.Column(VARCHAR(50))

    def __init__(self, filename, filePath, fileFormat):
        self.filename = filename
        self.filePath = filePath
        self.fileFormat = fileFormat

    def serialize(self):
        return  {
            'id': self.id,
            'filename': self.filename,
            'filePath': self.filePath,
            'fileFormat': self.fileFormat
        }