import pandas as pd
import numpy as np

from endpoints.DataProcess.models import DataProcess
from endpoints.DataUpload.models import DataFile
from shared.constants import *
from shared.request.response import generic_response
from shared.utils import delete_one_record, save_one_record
from shared.services.config import get_configs


def add_target_service(incoming):
    file_id = incoming[FILE_ID]
    target = incoming[FILE_TARGET_FIELD]
    try:
        if DataFile.query.filter_by(id=file_id).count() > 0:
            data_process = DataProcess(file_id=file_id, file=DataFile.query.filter_by(id=file_id).first(), target=target)
            save_one_record(record=data_process)
            return generic_response(status_code=201, success=True, message='Target field added successfully')
        else:
            return generic_response(status_code=400, success=False, message="File doesn't exist in DB")
    except Exception as e:
        return generic_response(status_code=500, success=False, message=f"Error storing record: {str(e)}")


def get_all_targets_service():
    process_files = DataProcess.query.all()
    data = []
    for file in process_files:
        data.append(
            {
                FILE_ID: file.file_id,
                FILE_NAME: file.file.file_name,
                FILE_TYPE: file.file.file_type,
                FILE_TARGET: file.target,
            }
        )
    return generic_response(
        status_code=200, success=True, message='Target fields of all files received successfully', data=data
    )


def delete_one_target_by_id_service(file_id):
    if DataFile.query.filter_by(id=file_id).count() > 0:
        if DataProcess.query.filter_by(file_id=file_id).count() > 0:
            target_record = DataProcess.query.filter_by(file_id=file_id).first()
            delete_one_record(record=target_record)
            return generic_response(status_code=200, success=True, message='Target field deleted successfully')
        else:
            return generic_response(status_code=400, success=False, message="Target field doesn't exist")
    else:
        return generic_response(status_code=400, success=False, message="File doesn't exist in DB")


def get_one_target_by_id_service(file_id):
    if DataFile.query.filter_by(id=file_id).count() > 0:
        if DataProcess.query.filter_by(file_id=file_id).count() > 0:
            target_record = DataProcess.query.filter_by(file_id=file_id).first()
            data = {
                FILE_NAME: target_record.file.file_name,
                FILE_TYPE: target_record.file.file_type,
                FILE_TARGET: target_record.target,
            }
            return generic_response(
                status_code=200, success=True, message='Target fields of all files received successfully', data=data
            )
        else:
            return generic_response(status_code=400, success=False, message="Target field doesn't exist")

    else:
        return generic_response(status_code=400, success=False, message="File doesn't exist in DB")

def get_data_metrics(file_id):
    configs = get_configs()
    file = DataFile.query.filter_by(id=file_id).first()
    if file:
        FILE_NAME = configs['api']['upload']['folder'] + '/' + file.file_name + '.' + file.file_type
        df = pd.read_csv(FILE_NAME)
        metrics = {}
        metrics['data_types']  = df.dtypes.apply(str).to_dict()
        metrics['correlation_matrix'] = df.corr().to_dict()
        metrics['metric'] = df.describe().to_dict()
        # cov_matrix_rounded = np.around(cov_matrix.values, 2).tolist()
        return generic_response(
                    status_code=200, success=True, message='Dataset metrics generated succesfully', data=metrics
                )
    else:
        return generic_response(status_code=400, success=False, message="File doesn't exist in DB")
