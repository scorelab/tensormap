from flask_restful import Resource
from endpoints.DeepLearning.validators import model_validate_post_validator, get_code_post_validator
from endpoints.DeepLearning.services import model_validate_service, get_code_service


class ValidateModel(Resource):

    def post(self):
        validator = model_validate_post_validator()
        args = validator.parse_args()
        return model_validate_service(incoming=args)


class GetCode(Resource):

    def post(self):
        validator = get_code_post_validator()
        args = validator.parse_args()
        return get_code_service(incoming=args)
