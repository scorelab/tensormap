from shared.request.response import generic_response
from shared.services.model.generation import model_generation
from shared.services.code.generation import code_generation
from endpoints.DeepLearning.models import ModelBasic, ModelConfigs
from shared.constants import *
from flatten_json import flatten
from shared.utils import save_one_record, save_multiple_records
import os
import subprocess
import shlex
from flask import send_file
from shared.utils import get_socket_ref

socketio = get_socket_ref()


def model_validate_service(incoming):
    # Generate basic model and config records
    model = ModelBasic(model_name=incoming[MODEL][MODEL_NAME], model_dataset=incoming[CODE][DATASET][FILE_ID],
                       model_type=incoming[CODE][PROBLEM_TYPE], target_class=incoming[CODE][DATASET][FILE_TARGET])

    configs = []
    params = flatten(incoming, separator=".")
    for param in params:
        configs.append(ModelConfigs(model_id=model.id, parameter=param, value=params[param]))

    save_one_record(record=model)
    save_multiple_records(records=configs)

    # Model validation and code generation
    model_generated = model_generation(model_params=incoming[MODEL])

    if model_generated:
        code_generated = code_generation(code_params=incoming[CODE])
        if not code_generated:
            return generic_response(status_code=400, success=False,
                                    message="Model validated successfully but code generation unsuccessful.")
        else:
            return generic_response(status_code=200, success=True,
                                    message="Model successfully validated and code generated.")
    else:
        return generic_response(status_code=400, success=False,
                                message="Whole validation process failed")


def get_code_service(incoming):
    model_name = incoming[MODEL_NAME]
    file_path = CODE_GENERATION_LOCATION + model_name + CODE_GENERATION_TYPE
    if os.path.isfile(file_path):
        # file = open(file_path, FILE_OPEN_MODE_READ)
        # data = file.read()
        # file.close()
        return send_file(path_or_file=file_path, as_attachment=True)
        # return generic_response(status_code=200, success=True, message="Code retrieved successfully.", data=data)
    else:
        return generic_response(status_code=400, success=False, message="Code retrieve failed.")


def run_code_service(incoming):
    model_name = incoming[MODEL_NAME]
    file_path = CODE_GENERATION_LOCATION + model_name + CODE_GENERATION_TYPE
    if os.path.isfile(file_path):
        run_command("python " + file_path)
        return generic_response(status_code=200, success=True, message="Model executed successfully.")
    else:
        return generic_response(status_code=400, success=False, message="Model file not found.")


def run_command(command):
    process = subprocess.Popen(shlex.split(command), stdout=subprocess.PIPE)
    while True:
        output = process.stdout.readline().decode("utf-8")
        if output == '' and process.poll() is not None:
            break
        if output.__contains__("Finish"):
            break
        if output:
            model_result(output)
            print(output)
    rc = process.poll()
    return rc


def model_result(message):
    socketio.emit(SOCKETIO_LISTENER, message, namespace=SOCKETIO_DL_NAMESPACE)


def get_available_model_list():
    model_list = ModelBasic.query.all()
    data = []
    for model in model_list:
        data.append(model.model_name)
    return generic_response(status_code=200, success=True, message="Model list generated successfully.", data=data)
