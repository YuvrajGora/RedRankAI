import json
import csv

# Load candidate IDs from submission.csv
top_ids = []

with open("Outputs/submission.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        top_ids.append(row["candidate_id"])

# Print first 10 candidate details
with open("Data/candidates.jsonl", "r", encoding="utf-8") as f:
    for line in f:
        candidate = json.loads(line)

        if candidate["candidate_id"] in top_ids[:10]:

            print("=" * 80)
            print(candidate["candidate_id"])
            print(candidate["profile"]["current_title"])
            print(candidate["profile"]["years_of_experience"])
            print(candidate["profile"]["summary"])
            print()

            print("Career History:")
            for job in candidate["career_history"]:
                print("-", job["title"], "|", job["company"])

            print()