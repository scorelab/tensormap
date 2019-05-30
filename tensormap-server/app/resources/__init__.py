from flask import Blueprint

dl_blueprint = Blueprint('dl_blueprint', __name__)

from . import dlmodel