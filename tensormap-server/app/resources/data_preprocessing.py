from flask import jsonify, redirect, url_for, render_template, request, session
from . import main
from .. import db
from .database_models.data_preproc import dataset
import os
import json
import csv

@main.route('/addData', methods=['POST'])
def addData():

    file = request.files['file']
    datasetFile = file.filename

    dirPath = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '.', 'dataset'))
    path = '{}{}{}'.format(dirPath, "/", datasetFile)

    splitFileInfo = datasetFile.split(".")
    fileName = splitFileInfo[0]
    fileFormat = splitFileInfo[1]

    if dataset.query.filter_by(fileName=fileName).one_or_none():
        return "error"

    else:

        file.save(path)   

        # writing the file entry in the database.
        data = dataset(fileName, path, fileFormat)
        db.session.add(data)
        db.session.commit()           
        return splitFileInfo[0]

@main.route('/visualizeData', methods=['GET'])
def visualizeData():
    allData = ""

    # ******************************************change
    # entry = dataset.query.filter_by(fileName=request.args['fileName']).one()

    entry = dataset.query.filter_by(fileName="store").one()

    print(entry.filePath)

    i= 0

    if entry:
        with open(entry.filePath, 'r') as f:
            for line in f:
                allData = allData + line
                if i == 0 or i == 1:
                    print(line)
                i+=1
            return allData
    else:
        return 'None'

#         with open(filename, 'r') as f:
#   for line in f:
#     print(line)


# with open ('Book8.csv','r') as csv_file:
#     reader =csv.reader(csv_file)
#     next(reader) # skip first row
#     for row in reader:
#         print(row)


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

