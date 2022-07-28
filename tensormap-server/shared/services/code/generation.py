from endpoints.DataUpload.models import DataFile
from jinja2 import Environment, FileSystemLoader
from shared.constants import *
from shared.services.config import get_configs


def code_generation(code_params):
    """
    This service is used to generate code

    :param code_params: parameters used to generate the code
    :return: success of the operation
    """
    dataset = code_params[DATASET]
    model = code_params[LEARNING_MODEL]

    data = {
        DATASET: {
            FILE_NAME: helper_generate_file_location(file_id=dataset[FILE_ID]),
            FILE_TARGET: dataset[FILE_TARGET],
            MODEL_TRAINING_SPLIT: dataset[MODEL_TRAINING_SPLIT],
        },
        LEARNING_MODEL: {
            MODEL_JSON_FILE: helper_generate_json_model_file_location(model_name=model[MODEL_NAME]),
            MODEL_OPTIMIZER: model[MODEL_OPTIMIZER],
            MODEL_METRIC: model[MODEL_METRIC],
            MODEL_EPOCHS: model[MODEL_EPOCHS],
        },
    }

    template_loader = FileSystemLoader(searchpath=TEMPLATE_ROOT)
    template_env = Environment(loader=template_loader)
    template = template_env.get_template(helper_map_correct_code_template(problem_type_id=code_params[PROBLEM_TYPE]))

    output = template.render(data=data)
    generated_code_file = open(CODE_GENERATION_LOCATION + model[MODEL_NAME] + CODE_GENERATION_TYPE, 'w+')
    generated_code_file.write(output + '\n')
    generated_code_file.close()
    return True


def helper_map_correct_code_template(problem_type_id):
    options = {1: CODE_TEMPLATE_FOLDER + 'multi-class-all-float-classification-csv.py'}
    return options[problem_type_id]


def helper_generate_file_location(file_id):
    configs = get_configs()
    file = DataFile.query.filter_by(id=file_id).first()
    return configs['api']['upload']['folder'] + '/' + file.file_name + '.' + file.file_type


def helper_generate_json_model_file_location(model_name):
    return MODEL_GENERATION_LOCATION + model_name + MODEL_GENERATION_TYPE
