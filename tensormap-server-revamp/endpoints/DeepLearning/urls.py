from endpoints.DeepLearning.views import ValidateModel
from shared.services.config import get_configs

configs = get_configs()


def model_urls(api):
    base = configs['api']['base']
    learn_uri = configs['api']['model']['uri']

    api.add_resource(ValidateModel, base + learn_uri + "/validate")
