from flask import session, redirect, url_for, render_template, request
from . import main
from .. import db
from .database_models.data_preproc import dataset
import os
import json
from flask import jsonify
import json


@main.route('/addData', methods=['POST'])
def addData():

    file = request.files['file']
    datasetFile = file.filename

    dirPath = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '.', 'dataset'))
    path = '{}{}{}'.format(dirPath, "/", datasetFile)
    file.save(path)

    splitFileInfo = datasetFile.split(".")
    fileName = splitFileInfo[0]
    fileFormat = splitFileInfo[1]
    print(fileName)
    print(fileFormat)
    print(path)

    # writing the file entry in the database.
    data = dataset(fileName, path, fileFormat)
    db.session.add(data)
    db.session.commit()

    return "file uploaded successfully"

@main.route('/viewData', methods=['GET'])
def viewData():
    entries = dataset.query.all()
    entries = [entry.serialize() for entry in entries]
    return json.dumps(entries)

@main.route('/updateData', methods=['GET'])
def updateData():
    entry = dataset.query.filter_by(id=int(request.args['id'])).one()
    entry.name = request.args['name']
    db.session.commit()
    return "successfully updated!!"

@main.route('/deleteData', methods=['GET'])
def deleteData():
    dataset.query.filter_by(id=int(request.args['id'])).delete()
    db.session.commit()
    return "successfully deleted!!"

@main.route('/visualizeData', methods=['GET'])
def visualizeData():
    entry = dataset.query.filter_by(name=request.args['name']).one_or_none()
    print(entry.filePath)
    if entry:
        with open(entry.filePath, 'r') as f:
            data = f.readlines()
            default = ""
            data = default.join(data)
            return data
    else:
        return 'None'