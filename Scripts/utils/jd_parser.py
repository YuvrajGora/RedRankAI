import json

with open(
    "Scripts/utils/current_jd.json",
    "r",
    encoding="utf-8"
) as f:

    JD_REQUIREMENTS = json.load(f)