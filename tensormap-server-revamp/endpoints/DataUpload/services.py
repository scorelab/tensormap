from flask import request
from werkzeug.utils import secure_filename
from shared.services.config import get_configs
from shared.request.response import generic_response
import os

configs = get_configs()


def add_file_service():
    file = request.files["data"]
    filename = secure_filename(file.filename)
    file.save(os.path.join(configs['api']['upload']['folder'], filename))
    return generic_response(status_code=201, success=True, message="File saved successfully")
