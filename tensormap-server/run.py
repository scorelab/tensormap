from app import create_app, socketio
from flask_cors import CORS

app = create_app(debug=True)
CORS(app)

if __name__ == '__main__':
    socketio.run(app)
