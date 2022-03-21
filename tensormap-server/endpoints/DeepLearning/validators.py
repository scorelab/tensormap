from flask_restful import reqparse

from shared.constants import *


def model_validate_post_validator():
    data_post_args = reqparse.RequestParser()
    data_post_args.add_argument(MODEL, type=dict, help="Please Add model related parameters correctly.",
                                required=True)
    data_post_args.add_argument(CODE, type=dict, help="Please Add code generation related parameters correctly.",
                                required=True)
    return data_post_args


def get_code_post_validator():
    data_post_args = reqparse.RequestParser()
    data_post_args.add_argument(MODEL_NAME, type=str, help="Please add a model name", required=True)
    return data_post_args
