from flask import Blueprint

main = Blueprint("main", __name__)

from . import data_preprocessing, dlmodel, template_manipulation
