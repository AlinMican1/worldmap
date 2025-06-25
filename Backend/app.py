from flask import Flask, jsonify
from flask_cors import CORS
from os import environ

app = Flask(__name__)
CORS(app) #Enable CORS to allow to HTTP requests from different ports.

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify({
        "message": "Hello World",
        "statuscode": 200
    })

if __name__ == '__main__':
    app.run(debug=True,port=8080) #port=environ.get(BASE_PORT))