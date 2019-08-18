from flask import jsonify, redirect, url_for, render_template, request, session
from . import main
from .. import db
from .database_models.data_preproc import dataset
import os
import json
import csv
import pandas as pd

def createJsonData(entry):
    i= 0
    columns = []
    data = []
    splitLine = None
    allData = {}

    if entry:
        with open(entry.filePath, 'r') as f:
            index = 0
            for line in f:
                if index == 0:
                    print(line)
                    newLine = line.replace('\n', '').replace('"','')
                    splitLine = newLine.split(",")
                    print(splitLine)
                    for column in splitLine:
                        temColumn = {}
                        temColumn["title"] = column
                        temColumn["field"] = column
                        columns.append(temColumn)
                    print(columns)
                else:

                    newRowLine = line.replace('\n', '').replace('"','')
                    splitData = newRowLine.split(",")
                    if index==1:
                        print(line)
                        print(newRowLine)
                        print(splitData)
                        print(splitLine)

                    temRow = {}
                    for i in range(len(splitData)):
                        temRow[splitLine[i]] = splitData[i]
                    data.append(temRow)
                index += 1

        allData["columns"]=columns
        allData["data"]=data
        allData["error"]="None"
        responseData = json.dumps(allData)
        return responseData

    else:
        allData["columns"]="None"
        allData["data"]="None"
        allData["error"]="Dataset Not Found"
        responseData = json.dumps(allData)
        return responseData


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

    # ******************************************change
    # entry = dataset.query.filter_by(fileName=request.args['fileName']).one()

    entry = dataset.query.filter_by(fileName="store").one()
    print(entry.filePath)
    responseData = createJsonData(entry)
    return responseData


@main.route('/addRow', methods=['POST'])
def addDataRow():
    content = request.get_json()

    entry = dataset.query.filter_by(fileName=content['fileName']).one()

    print(entry.filePath)

    row = []
    dataCsv = pd.read_csv(entry.filePath)

    for column in content["columnData"]:
        if column["title"] in  content["rowdata"]:
            row.append(content["rowdata"][column["title"]])
        else:
            row.append("None")
    print(row)

    dataCsv.loc[len(dataCsv)] = row
    dataCsv.to_csv(entry.filePath, index=False)

    return "Done"

@main.route('/editRow', methods=['POST'])
def editDataRow():

    content = request.get_json()

    entry = dataset.query.filter_by(fileName=content['fileName']).one()

    print(entry.filePath)

    row = []
    dataCsv = pd.read_csv(entry.filePath)

    for column in content["columnData"]:
        if column["title"] in  content["newRowData"]:
            row.append(content["newRowData"][column["title"]])
        else:
            row.append("None")
    print(row)

    dataCsv.loc[content["newRowData"]["tableData"]["id"]] = row
    dataCsv.to_csv(entry.filePath, index=False)

    return "Done"

@main.route('/deleteRow', methods=['POST'])
def deleteDataRow():

    content = request.get_json()

    entry = dataset.query.filter_by(fileName=content['fileName']).one()

    print(entry.filePath)

    dataCsv = pd.read_csv(entry.filePath)

    dataCsv.drop(dataCsv.index[content["oldRowData"]["tableData"]["id"]], inplace = True)
    dataCsv.to_csv(entry.filePath, index=False)

    return "Done"



@main.route('/viewData', methods=['GET'])
def viewData():
    entries = dataset.query.all()
    entries = [entry.serialize() for entry in entries]
    return json.dumps(entries)

# @main.route('/updateData', methods=['GET'])
# def updateData():
#     entry = dataset.query.filter_by(id=int(request.args['id'])).one()
#     entry.name = request.args['name']
#     db.session.commit()
#     return "successfully updated!!"

# @main.route('/deleteData', methods=['GET'])
# def deleteData():
#     dataset.query.filter_by(id=int(request.args['id'])).delete()
#     db.session.commit()
#     return "successfully deleted!!"

