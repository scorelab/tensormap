from flask_restful import Api
from endpoints.DataUpload.urls import data_urls


class MainURLRegister:
    api_ref = None

    def __init__(self, app):
        api = Api(app)
        MainURLRegister.api_ref = api
        data_urls(api=api)
