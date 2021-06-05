from jinja2 import FileSystemLoader, Environment
from shared.constants import *


def model_generation(model_params):
    """
    This function is used to generate JSON object used to generate TF model and save it in the ./template/json-model
    folder.

    :param model_params: contain the parameters needs to create model
    """
    template_loader = FileSystemLoader(searchpath=TEMPLATE_ROOT)
    template_env = Environment(loader=template_loader)
    template = template_env.get_template(MODEL_TEMPLATE)

    layer_types = model_params[LAYER_TYPES]
    data = {}

    for layer in layer_types:
        if layer == LAYER_TYPE_DENSE:
            data[layer] = helper_generate_dense_layers(dense=model_params[layer])
        else:
            data[layer] = model_params[layer]

    output = template.render(data=data)
    generated_model_file = open(MODEL_GENERATION_LOCATION + model_params[MODEL_NAME] + MODEL_GENERATION_TYPE, 'w+')
    generated_model_file.write(output + "\n")
    generated_model_file.close()


def helper_generate_dense_layers(dense):
    """
    Helper function used to add id to the dense array

    :param dense: dense array without id
    :return: dense array with id
    """
    layers = []
    i = 1
    for layer in dense:
        layers.append({DENSE_UNITS: layer[DENSE_UNITS], DENSE_ACTIVATION_FUNCTION: layer[DENSE_ACTIVATION_FUNCTION],
                       DENSE_ID: i})
        i += 1
    return layers
