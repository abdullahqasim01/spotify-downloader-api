import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/tracks", methods=["GET"])
def get_tracks():
    url = "https://spotify.musicdown.co/api/get-metadata"
    query = request.args.get("url")
    
    print(query)
    
    payload = {
    "url": query
    }

    response = requests.post(url, json=payload)

    return jsonify(response.json())

@app.route("/download", methods=["GET"])
def download_track():
    url = "https://spotify.musicdown.co/api/download-track"
    query = request.args.get("url")

    payload = {
    "url": query
    }

    response = requests.post(url, json=payload)

    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)