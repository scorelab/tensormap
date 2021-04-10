import yaml

"""
This service load configs in the config.yaml file and load config as singleton object in anywhere it calls
"""


def get_configs():
    if ConfigHandler.config_obj is None:
        ConfigHandler()
    return ConfigHandler.config_obj


class ConfigHandler:
    config_obj = None

    def __init__(self):
        if ConfigHandler.config_obj is None:
            self.config_file = 'config.yaml'
            ConfigHandler.config_obj = self.load_config()

    def load_config(self):
        with open(self.config_file, 'r+', encoding="utf-8") as stream:
            try:
                return yaml.safe_load(stream)
            except yaml.YAMLError as exc:
                print(exc)
