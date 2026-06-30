import json
from collections import Counter

DATASET_PATH = "Data/candidates.jsonl"

job_titles = Counter()
countries = Counter()
skills = Counter()

candidate_count = 0

with open(DATASET_PATH, "r", encoding="utf-8") as file:
    for line in file:
        candidate = json.loads(line)

        candidate_count += 1

        profile = candidate.get("profile", {})

        job_titles[profile.get("current_title", "Unknown")] += 1
        countries[profile.get("country", "Unknown")] += 1

        for skill in candidate.get("skills", []):
            skills[skill.get("name", "Unknown")] += 1

print("=" * 60)
print(f"Total Candidates : {candidate_count}")

print("\nTop 20 Current Job Titles")
print("-" * 60)

for title, count in job_titles.most_common(20):
    print(f"{title:<30} {count}")

print("\nTop 20 Skills")
print("-" * 60)

for skill, count in skills.most_common(20):
    print(f"{skill:<30} {count}")

print("\nTop Countries")
print("-" * 60)

for country, count in countries.most_common(10):
    print(f"{country:<20} {count}")