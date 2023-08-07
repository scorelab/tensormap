from endpoints.DataProcess.services import (
    add_target_service,
    delete_one_target_by_id_service,
    get_all_targets_service,
    get_one_target_by_id_service,
    get_corr_matrix
)
from endpoints.DataProcess.validators import target_add_post_validator
from flask_restful import Resource


class ProcessAddNGet(Resource):
    def post(self):
        validator = target_add_post_validator()
        args = validator.parse_args()
        return add_target_service(incoming=args)

    def get(self):
        return get_all_targets_service()


class ProcessIDOperations(Resource):
    def delete(self, file_id):
        return delete_one_target_by_id_service(file_id=file_id)

    def get(self, file_id):
        return get_one_target_by_id_service(file_id=file_id)
    
class GetCovMatrix(Resource):
    def get(self,file_id):
        return get_corr_matrix(file_id=file_id)
