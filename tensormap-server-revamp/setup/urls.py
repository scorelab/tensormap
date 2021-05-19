from flask_restful import Api


class MainURLRegister:
    api_ref = None

    def __init__(self, app):
        api = Api(app)
        MainURLRegister.api_ref = api
