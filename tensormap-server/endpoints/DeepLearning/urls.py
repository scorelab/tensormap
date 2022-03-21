from endpoints.DeepLearning.views import ValidateModel, GetCode, RunCode, GetModelList
from shared.constants import *
from shared.services.config import get_configs

configs = get_configs()


def model_urls(api):
    base = configs['api']['base']
    learn_uri = configs['api']['model']['uri']

    api.add_resource(ValidateModel, base + learn_uri + URL_VALIDATE)
    api.add_resource(GetCode, base + learn_uri + URL_CODE)
    api.add_resource(GetModelList, base + learn_uri + URL_GET_MODEL_LIST)
    api.add_resource(RunCode, base + learn_uri + URL_RUN)
