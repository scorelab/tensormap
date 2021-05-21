from flask import request
from werkzeug.utils import secure_filename
from shared.services.config import get_configs
from shared.request.response import generic_response
from endpoints.DataUpload.models import DataFile
from shared.utils import save_one_record, delete_one_record
import os
import pandas as pd

configs = get_configs()


def add_file_service():

    # Extract the file and save it in the ./data folder
    file = request.files["data"]
    filename = secure_filename(file.filename)
    file.save(os.path.join(configs['api']['upload']['folder'], filename))

    # Extract the file name and type and save details in the database
    file_name_db = file.filename.rsplit('.', 1)[0].lower()
    file_type_db = file.filename.rsplit('.', 1)[1].lower()
    data = DataFile(file_name=file_name_db, file_type=file_type_db)
    save_one_record(record=data)

    return generic_response(status_code=201, success=True, message="File saved successfully")


def get_all_files_service():
    data = []
    files = DataFile.query.all()
    for file in files:
        df = pd.read_csv(configs['api']['upload']['folder'] + "/" + file.file_name + "." + file.file_type)
        fields = list(df.columns)
        data.append({"file_name": file.file_name, "file_type": file.file_type, "file_id": file.id, "fields": fields})
    return generic_response(status_code=200, success=True, message="Saved files found successfully", data=data)


def delete_one_file_by_id_service(file_id):

    # Check file exists in DB and check the file in ./data directory if exist, file deleted
    if DataFile.query.filter_by(id=file_id).count() > 0:
        file = DataFile.query.filter_by(id=file_id).first()
        if os.path.isfile(configs['api']['upload']['folder'] + "/" + file.file_name + "." + file.file_type):
            os.remove(configs['api']['upload']['folder'] + "/" + file.file_name + "." + file.file_type)
            delete_one_record(record=file)
            return generic_response(status_code=200, success=True, message="Files deleted successfully")
        else:
            return generic_response(status_code=400, success=False, message="File not found")
    else:
        return generic_response(status_code=400, success=False, message="File not in the DB")
