import json
from pprint import pprint

TARGET_ID = "CAND_0000001"

with open("Data/candidates.jsonl", "r", encoding="utf-8") as f:
    for line in f:
        candidate = json.loads(line)

        if candidate["candidate_id"] == TARGET_ID:
            pprint(candidate)
            break