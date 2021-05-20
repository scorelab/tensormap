from flask_restful import reqparse
from flask import request

ALLOWED_EXTENSIONS = {'csv'}


def data_upload_post_validator():
    data_post_args = reqparse.RequestParser()

    if 'data' not in request.files:
        data_post_args.add_argument("data", help="file is required", required=True)
    else:
        is_file_allowed = allowed_file(filename=request.files["data"].filename)
        if request.files["data"].filename == "":
            data_post_args.add_argument("data", help="Please select the file.",
                                        required=True)
        if not is_file_allowed:
            data_post_args.add_argument("data", help="Please check the file type. you added wrong format. (CSV only)",
                                        required=True)

    return data_post_args


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
