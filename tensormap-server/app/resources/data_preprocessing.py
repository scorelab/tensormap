from flask import session, redirect, url_for, render_template, request
from . import main
from .. import db
from .database_models.data_preproc import dataset
import os
import json
from flask import jsonify

@main.route('/addData', methods=['GET', 'POST'])
def addData():
	# retrieving the details of the dataset
    dataset_name = request.form['dataset_name']
    dataset_type = request.form['dataset_type']
    dataset_file = request.files['dataset_csv']

    # saving the csv file on server.
    dataset_filepath = os.path.join('/home/subramanyam/scorelab/TensorMap/tensormap-server/app/datasets', dataset_file.filename)
    dataset_file.save(dataset_filepath)

    # writing the file entry in the database.
    entry = dataset(name=dataset_name, filePath=dataset_filepath, fileFormat=dataset_type)
    db.session.add(entry)
    db.session.commit()
    return "file saved!!!"

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
