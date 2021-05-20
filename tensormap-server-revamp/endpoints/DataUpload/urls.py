from endpoints.DataUpload.views import UploadDataFile
from shared.services.config import get_configs

configs = get_configs()


def data_urls(api):
    base = configs['api']['base']
    data_uri = configs['api']['upload']['uri']

    api.add_resource(UploadDataFile, base + data_uri + "/file")
