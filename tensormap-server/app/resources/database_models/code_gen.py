from ... import db
from sqlalchemy.dialects.mysql import VARCHAR, BLOB

class template_copies(db.Model):
    id = db.Column(VARCHAR(50),primary_key=True)
    fileName = db.Column(VARCHAR(50))
    data = db.Column(BLOB)

    def __init__(self,id,fileName,data):
        self.id = id
        self.fileName = fileName
        self.data = data
        



