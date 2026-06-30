import csv
import json

DATASET = "Data/candidates.jsonl"
SUBMISSION = "Outputs/submission.csv"


def get_top_candidates():

    profiles = {}

    with open(DATASET, "r", encoding="utf-8") as f:

        for line in f:

            candidate = json.loads(line)

            profiles[candidate["candidate_id"]] = candidate

    candidates = []

    with open(SUBMISSION, newline="", encoding="utf-8") as f:

        reader = csv.DictReader(f)

        for row in reader:

            profile = profiles.get(row["candidate_id"])

            if not profile:
                continue

            score = float(row["score"])

            candidates.append({

                "id": row["candidate_id"],

                "title": profile["profile"]["current_title"],

                "match": round(min(score / 3.7, 99.9), 1),

                "experience": profile["profile"]["years_of_experience"],

                "skills": [
                    s["name"]
                    for s in profile["skills"][:5]
                ],

                "reason": (
                    f"Semantic AI score: {score}. "
                    f"{profile['profile']['years_of_experience']} years experience. "
                    f"Strong relevance based on skills and recruiter signals."
                )

            })

    return candidates