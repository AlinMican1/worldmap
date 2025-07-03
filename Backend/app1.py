import zoneinfo
from datetime import datetime, timedelta
from os import environ

import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from worldmap.Backend.app.utils.timezones import COUNTRIES

app = FastAPI()
#Look later for production
# ENV = os.getenv("ENV", "development")

# if ENV == "production":
#     origins = ["https://myfrontend.com"]
# else:
#     origins = [
#         "http://localhost:8080",
#         "http://127.0.0.1:8080",
#     ]

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:8080",
    "http://127.0.0.1:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
async def hello():
    return {"message": "Hello from FastAPI!"}
# @app.route('/api/hello', methods=['GET'])
# def hello_world():
#     return jsonify({
#         "message": "Hello World",
#         "statuscode": 200
#     })

# @app.route('/api/time/<location>', methods=['GET'])
# def get_time(location):
#     ukTime = zoneinfo.ZoneInfo('Europe/London')
#     nowUk = datetime.now(ukTime)
    
#     offset = COUNTRIES.get(location.upper())
#     selectedCountryTime = nowUk + timedelta(hours=offset[0], minutes=offset[1])
#     print(nowUk.dst())
#     if (offset[2] == True):
#         selectedCountryTime += nowUk.dst()
#     #Check if country exists in dictionary, needs to implement this
    
#     return jsonify({
#         "Country": location,
#         "Time": selectedCountryTime,
#     })

#     # try:
#     #     print(f"http://worldtimeapi.org/api/timezone/Europe/{location}")
#     #     response = requests.get(f"http://worldtimeapi.org/api/timezone/Europe/{location}")
#     #     return jsonify(response.json())
#     # except Exception as e:
#     #     print(e)
#     #     return jsonify({"error": str(e)}), 500


# if __name__ == '__main__':
#     app.run(debug=True,port=8080) #port=environ.get(BASE_PORT))
