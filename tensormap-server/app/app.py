from flask import Flask, Blueprint
from flask_restful import Api, Resource, url_for
from resources.users import Users

app = Flask(__name__)
api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# Add resources
api.add_resource(Users, '/users', '/users/<string:id>')
app.register_blueprint(api_bp)

if __name__ == '__main__':
    app.run(debug=True)
