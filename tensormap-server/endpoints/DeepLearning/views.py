from endpoints.DeepLearning.services import (
    get_available_model_list,
    get_code_service,
    model_validate_service,
    run_code_service,
)
from endpoints.DeepLearning.validators import (
    get_code_post_validator,
    model_validate_post_validator,
)
from flask_restful import Resource


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


class RunCode(Resource):
    def post(self):
        validator = get_code_post_validator()
        args = validator.parse_args()
        return run_code_service(incoming=args)


class GetModelList(Resource):
    def get(self):
        return get_available_model_list()
