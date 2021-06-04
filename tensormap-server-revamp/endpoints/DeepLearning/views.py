from flask_restful import Resource
from endpoints.DeepLearning.validators import model_validate_post_validator
from endpoints.DeepLearning.services import model_validate_service


class ValidateModel(Resource):

    def post(self):
        validator = model_validate_post_validator()
        args = validator.parse_args()
        return model_validate_service(incoming=args)
