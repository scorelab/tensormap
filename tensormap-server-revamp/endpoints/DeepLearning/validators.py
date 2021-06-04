from flask_restful import reqparse


def model_validate_post_validator():
    data_post_args = reqparse.RequestParser()
    # TODO validate
    return data_post_args
