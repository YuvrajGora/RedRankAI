import json

DATASET_PATH = "Data/candidates.jsonl"

interesting_titles = [
    "AI Engineer",
    "Machine Learning Engineer",
    "ML Engineer",
    "Software Engineer",
    "Backend Engineer",
    "Full Stack Developer",
    "Cloud Engineer"
]

count = 0

with open(DATASET_PATH, "r", encoding="utf-8") as file:

    for line in file:

        candidate = json.loads(line)

        title = candidate["profile"]["current_title"]

        if title in interesting_titles:

            print("=" * 80)

            print("Candidate:", candidate["candidate_id"])
            print("Title:", title)

            print("Experience:",
                  candidate["profile"]["years_of_experience"])

            print()

            print("Skills:")

            for s in candidate["skills"][:15]:
                print("-", s["name"])

            print()

            print("Summary:")
            print(candidate["profile"]["summary"][:500])

            count += 1

            if count == 10:
                break