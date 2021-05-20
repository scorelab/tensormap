from flask import request
from werkzeug.utils import secure_filename
from shared.services.config import get_configs
from shared.request.response import generic_response
from endpoints.DataUpload.models import DataFile
from shared.utils import save_one_record
import os

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
