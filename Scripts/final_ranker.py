import json
from jd_matcher import jd_score
from tqdm import tqdm
from career_analyzer import career_score
from utils.jd_parser import JD_REQUIREMENTS
from utils.reason_generator import generate_reason
from utils.csv_export import export_csv

DATASET = "Data/candidates.jsonl"

results = []

AI_SKILLS = set(JD_REQUIREMENTS["required_skills"])
GOOD_TITLES = set(JD_REQUIREMENTS["required_titles"])


def score_candidate(candidate):

    score = 0
    score += career_score(candidate)
    score += jd_score(candidate)
    summary = candidate["profile"]["summary"].lower()
    if "retrieval" in summary:
        score += 12
    if "embedding" in summary:
        score += 12
    if "ranking" in summary:
        score += 10
    if "vector" in summary:
        score += 10
    if "production" in summary:
        score += 8
    if "startup" in summary:
        score += 6

    profile = candidate["profile"]
    signals = candidate["redrob_signals"]
    skills = candidate["skills"]

    # -------------------------
    # Experience
    # -------------------------

    exp = profile["years_of_experience"]

    if 5 <= exp <= 9:
        score += 25
    elif 4 <= exp < 5:
        score += 15
    elif exp > 9:
        score += 18

    # -------------------------
    # Current Title
    # -------------------------

    if profile["current_title"] in GOOD_TITLES:
        score += 20

    # -------------------------
    # AI Skills
    # -------------------------

    candidate_skill_names = {
        s["name"] for s in skills
    }

    matches = AI_SKILLS.intersection(candidate_skill_names)

    score += len(matches) * 5

    # -------------------------
    # Behavioral Signals
    # -------------------------

    if signals["open_to_work_flag"]:
        score += 5

    score += signals["github_activity_score"]

    score += signals["interview_completion_rate"] * 10

    score += signals["recruiter_response_rate"] * 10

    if signals["notice_period_days"] <= 60:
        score += 5

    return round(score, 2)


print("Ranking candidates...")

with open(DATASET, "r", encoding="utf-8") as f:

    for line in tqdm(f):

        candidate = json.loads(line)

        score = score_candidate(candidate)

        reason = generate_reason(candidate, score)

        results.append({

            "candidate_id": candidate["candidate_id"],
            "score": score,
            "reason": reason,
            "candidate": candidate

        })

# Sort ALL candidates correctly
results.sort(
    key=lambda x: (
        -x["score"],
        x["candidate_id"]
    )
)

top100 = results[:100]

export_csv(
    top100,
    "Outputs/submission.csv"
)

print("\nSubmission created successfully!")

print("\nTop 10")

for i, row in enumerate(top100[:10], start=1):

    print(
        i,
        row["candidate_id"],
        row["score"]
    )