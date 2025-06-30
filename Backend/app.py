import zoneinfo
from datetime import datetime, timedelta
from os import environ

import requests
from flask import Flask, jsonify
from flask_cors import CORS
from timezones import COUNTRIES

app = Flask(__name__)
CORS(app) #Enable CORS to allow to HTTP requests from different ports.

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify({
        "message": "Hello World",
        "statuscode": 200
    })

@app.route('/api/time/<location>', methods=['GET'])
def get_time(location):
    ukTime = zoneinfo.ZoneInfo('Europe/London')
    nowUk = datetime.now(ukTime)
    
    offset = COUNTRIES.get(location.upper())
    selectedCountryTime = nowUk + timedelta(hours=offset[0], minutes=offset[1])
    print(nowUk.dst())
    if (offset[2] == True):
        selectedCountryTime += nowUk.dst()
    #Check if country exists in dictionary, needs to implement this
    
    return jsonify({
        "Country": location,
        "Time": selectedCountryTime,
    })

    # try:
    #     print(f"http://worldtimeapi.org/api/timezone/Europe/{location}")
    #     response = requests.get(f"http://worldtimeapi.org/api/timezone/Europe/{location}")
    #     return jsonify(response.json())
    # except Exception as e:
    #     print(e)
    #     return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True,port=8080) #port=environ.get(BASE_PORT))
