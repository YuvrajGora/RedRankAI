import json
from tqdm import tqdm

DATASET_PATH = "Data/candidates.jsonl"

# ============================
# JD Requirements
# ============================

REQUIRED_SKILLS = {
    "Python",
    "Embeddings",
    "Retrieval",
    "Vector Databases",
    "Pinecone",
    "Qdrant",
    "Milvus",
    "FAISS",
    "Weaviate",
    "OpenSearch",
    "Elasticsearch",
    "LLM",
    "Fine-tuning LLMs",
    "LoRA",
    "PEFT",
    "RAG",
    "LangChain",
    "TensorFlow",
    "PyTorch",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "BentoML",
    "MLflow"
}

GOOD_TITLES = {
    "AI Engineer",
    "Machine Learning Engineer",
    "ML Engineer",
    "Software Engineer",
    "Backend Engineer",
    "Cloud Engineer",
    "Full Stack Developer"
}


def calculate_score(candidate):

    score = 0

    profile = candidate["profile"]
    skills = candidate["skills"]
    signals = candidate["redrob_signals"]

    # ------------------------
    # Experience
    # ------------------------

    exp = profile["years_of_experience"]

    if 5 <= exp <= 9:
        score += 30
    elif 4 <= exp < 5:
        score += 15
    elif exp > 9:
        score += 20

    # ------------------------
    # Current Title
    # ------------------------

    if profile["current_title"] in GOOD_TITLES:
        score += 20

    # ------------------------
    # Skill Match
    # ------------------------

    candidate_skills = {
        s["name"] for s in skills
    }

    score += len(
        REQUIRED_SKILLS.intersection(candidate_skills)
    ) * 4

    # ------------------------
    # Behaviour
    # ------------------------

    if signals["open_to_work_flag"]:
        score += 5

    score += signals["interview_completion_rate"] * 10

    score += signals["recruiter_response_rate"] * 10

    score += min(
        signals["github_activity_score"],
        100
    ) / 10

    if signals["notice_period_days"] <= 60:
        score += 5

    return round(score, 2)


ranked = []

print("Scoring candidates...\n")

with open(DATASET_PATH, "r", encoding="utf-8") as file:

    for line in tqdm(file):

        candidate = json.loads(line)

        score = calculate_score(candidate)

        ranked.append(
            (
                candidate["candidate_id"],
                score,
                candidate
            )
        )

ranked.sort(
    key=lambda x: x[1],
    reverse=True
)

print("\nTop 10 Candidates\n")

for i, (cid, score, cand) in enumerate(ranked[:10], 1):

    print(
        f"{i}. {cid} | "
        f"{cand['profile']['current_title']} | "
        f"{score}"
    )