from flask_restful import Api

from endpoints.DataProcess.urls import process_urls
from endpoints.DataUpload.urls import data_urls
from endpoints.DeepLearning.urls import model_urls

"""
To add a new urls to the application, all the url functions defined in the relevant files, need to be register here.
"""

"""
To add a new urls to the application, all the url functions defined in the relevant files, need to be register here.
"""


class MainURLRegister:
    api_ref = None

    def __init__(self, app):
        api = Api(app)
        MainURLRegister.api_ref = api
        data_urls(api=api)
        process_urls(api=api)
        model_urls(api=api)
