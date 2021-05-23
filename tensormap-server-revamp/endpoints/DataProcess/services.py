from endpoints.DataProcess.models import DataProcess
from endpoints.DataUpload.models import DataFile
from shared.utils import save_one_record, delete_one_record
from shared.request.response import generic_response


def add_target_service(incoming):
    file_id = incoming["file_id"]
    target = incoming["target"]

    if DataFile.query.filter_by(id=file_id).count() > 0:
        data_process = DataProcess(file_id=file_id, file=DataFile.query.filter_by(id=file_id).first(), target=target)
        save_one_record(record=data_process)
        return generic_response(status_code=201, success=True, message="Target field added successfully")
    else:
        return generic_response(status_code=400, success=False, message="File doesn't exist in DB")


def get_all_targets_service():
    process_files = DataProcess.query.all()
    data = []
    for file in process_files:
        data.append({"file_id": file.file_id, "file_name": file.file.file_name, "file_type": file.file.file_type,
                     "target_field": file.target})
    return generic_response(status_code=200, success=True, message="Target fields of all files received successfully",
                            data=data)


def delete_one_target_by_id_service(file_id):
    if DataFile.query.filter_by(id=file_id).count() > 0:
        if DataProcess.query.filter_by(file_id=file_id).count() > 0:
            target_record = DataProcess.query.filter_by(file_id=file_id).first()
            delete_one_record(record=target_record)
            return generic_response(status_code=200, success=True, message="Target field deleted successfully")
        else:
            return generic_response(status_code=400, success=False, message="Target field doesn't exist")
    else:
        return generic_response(status_code=400, success=False, message="File doesn't exist in DB")


def get_one_target_by_id_service(file_id):
    if DataFile.query.filter_by(id=file_id).count() > 0:
        if DataProcess.query.filter_by(file_id=file_id).count() > 0:
            target_record = DataProcess.query.filter_by(file_id=file_id).first()
            data = {"file_name": target_record.file.file_name, "file_type": target_record.file.file_type,
                    "target_field": target_record.target}
            return generic_response(status_code=200, success=True,
                                    message="Target fields of all files received successfully",
                                    data=data)
        else:
            return generic_response(status_code=400, success=False, message="Target field doesn't exist")

    else:
        return generic_response(status_code=400, success=False, message="File doesn't exist in DB")
