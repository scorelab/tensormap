from flask_restful import reqparse
from shared.constants import *


def target_add_post_validator():
    process_post_args = reqparse.RequestParser()
    process_post_args.add_argument(FILE_TARGET_FIELD, type=str, help='Please select the target class.', required=True)
    process_post_args.add_argument(FILE_ID, type=int, help='Please specify the file id.', required=True)
    return process_post_args
