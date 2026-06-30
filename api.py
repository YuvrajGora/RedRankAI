from flask import Flask, jsonify, request
from flask_cors import CORS
from Scripts.ranking_api import get_top_candidates
from Scripts.jd_extractor import extract_requirements

import subprocess
import json
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "Uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/health")
def health():
    return jsonify({
        "backend": "running"
    })


@app.post("/rank")
def rank():

    if "jd" not in request.files:

        return jsonify({
            "success": False,
            "message": "No job description uploaded."
        }), 400

    file = request.files["jd"]

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(filepath)

    from Scripts.jd_extractor import extract_text, extract_requirements

    text = extract_text(filepath)

    jd = extract_requirements(text)

    with open(
        "Scripts/utils/current_jd.json",
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            jd,
            f,
            indent=4
        )

    # ---------- Run Ranking ----------

    subprocess.run(
        ["python", "Scripts/final_ranker.py"],
        check=True
    )

    candidates = get_top_candidates()

    return jsonify({

        "success": True,
        "requirements": jd,
        "candidates": candidates

    })


if __name__ == "__main__":
    app.run(
        debug=False,
        port=5000
    )