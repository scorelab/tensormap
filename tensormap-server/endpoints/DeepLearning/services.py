import tensorflow as tf
import json
import io

import constants.errors as errors
from endpoints.DeepLearning.models import ModelBasic, ModelConfigs
from flask import send_file
from flatten_json import flatten
from shared.constants import *
from shared.request.response import generic_response
from shared.services.code.generation import generate_code
from shared.services.model.generation import model_generation
from shared.utils import get_socket_ref, save_multiple_records, save_one_record
import pymysql
from endpoints.DeepLearning.modelRun import model_run

socketio = get_socket_ref()


def model_validate_service(incoming):
    # Model generation
    model_generated = model_generation(model_params=incoming[MODEL])
    
    # Validate the Model first
    try:
        tf.keras.models.model_from_json(json.dumps(model_generated))
    except Exception as e:
        print(e)
        for error in errors.err_msgs.keys():
            if error in str(e):
                return generic_response(status_code=400,success=False,message=errors.err_msgs[error])
        else:
            return generic_response(status_code=400,success=False,message='Model validation failed. Please recheck the model and inputs')
    
    # Check for duplicate file names
    if ModelBasic.query.filter_by(model_name=incoming[CODE][DL_MODEL][MODEL_NAME]).first():
        return generic_response(status_code=400,success=False,message="Model name already used. Use a different name")
    
    # Only the valid models are saved in the DB
    model = ModelBasic(
        model_name=incoming[CODE][DL_MODEL][MODEL_NAME],
        file_id=incoming[CODE][DATASET][FILE_ID],
        model_type=incoming[CODE][PROBLEM_TYPE],
        target_field=incoming[CODE][DATASET][FILE_TARGET],
        training_split = incoming[CODE][DATASET][MODEL_TRAINING_SPLIT],
        optimizer = incoming[CODE][DL_MODEL][MODEL_OPTIMIZER],
        metric = incoming[CODE][DL_MODEL][MODEL_METRIC],
        epochs = incoming[CODE][DL_MODEL][MODEL_EPOCHS]
    )

    configs = []
    params = flatten(incoming, separator='.')
    for param in params:
        configs.append(ModelConfigs(model_id=model.id, parameter=param, value=params[param]))

    try:
        save_one_record(record=model)
        save_multiple_records(records=configs)
    except pymysql.err.IntegrityError as e:
        print(e)
        for error in errors.err_msgs.keys():
            if error in str(e):
                return generic_response(status_code=400,success=False,message=errors.err_msgs[error])
        else:
            return generic_response(status_code=400,success=False,message='Model saving failed. Please recheck the model configs')
    
    generated_model_file = open(MODEL_GENERATION_LOCATION + incoming[CODE][DL_MODEL][MODEL_NAME] + MODEL_GENERATION_TYPE, 'w+')
    
    try:
        generated_model_file.write(json.dumps(model_generated) + '\n')
    except Exception as e:
        print(e)
        return generic_response(status_code=400,success=False,message='Model validated but failed to save')
    else:
        generated_model_file.close()

    return generic_response(status_code=200,success=True,message='Model Validation and saving successful')

def get_code_service(incoming):
    model_name = incoming[MODEL_NAME]
    file_name = model_name+".py"
    python_code = generate_code(model_name)
    temp_file = io.BytesIO(python_code.encode())
    return send_file(path_or_file=temp_file, as_attachment=True,download_name=file_name)

def run_code_service(incoming):
    try:
        model_run(incoming)
        return generic_response(status_code=200, success=True, message='Model executed successfully.')
        
    except Exception as e:
        print(e)
        for error in errors.err_msgs.keys():
            if error in str(e):
                return generic_response(status_code=400,success=False,message=errors.err_msgs[error])
        else:
            return generic_response(status_code=400,success=False,message='Model running failed. Please recheck the model configs')

def get_available_model_list():
    model_list = ModelBasic.query.all()
    data = []
    for model in model_list:
        data.append(model.model_name)
    return generic_response(status_code=200, success=True, message='Model list generated successfully.', data=data)
