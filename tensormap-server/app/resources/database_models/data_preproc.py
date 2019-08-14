from ... import db
from sqlalchemy.dialects.mysql import VARCHAR, BLOB, INTEGER,TEXT, JSON

class dataset(db.Model):
    fileName = db.Column(VARCHAR(50), primary_key=True)
    filePath = db.Column(VARCHAR(1000))
    fileFormat = db.Column(VARCHAR(50))

    def __init__(self, fileName, filePath, fileFormat):
        self.fileName = fileName
        self.filePath = filePath
        self.fileFormat = fileFormat

    def serialize(self):
        return  {
            'fileName': self.fileName,
            'filePath': self.filePath,
            'fileFormat': self.fileFormat
        }