from flask_restful import Resource
from endpoints.DataUpload.validators import data_upload_post_validator
from endpoints.DataUpload.services import add_file_service


class UploadDataFile(Resource):

    def post(self):
        validator = data_upload_post_validator()
        args = validator.parse_args()
        return add_file_service()
