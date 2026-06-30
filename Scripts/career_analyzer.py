AI_TERMS = [
    "retrieval", "embedding", "vector", "rag",
    "llm", "transformer", "fine-tuning", "lora",
    "pytorch", "tensorflow", "nlp", "computer vision",
    "ranking", "recommendation", "search", "milvus",
    "pinecone", "qdrant", "faiss", "langchain"
]

PRODUCTION_TERMS = [
    "built", "designed", "implemented", "deployed",
    "production", "scaled", "optimized", "pipeline",
    "architecture", "real-time", "distributed"
]

NEGATIVE_TERMS = [
    "learning", "self-directed", "course",
    "transitioning", "interested", "beginner"
]


def career_score(candidate):

    score = 0

    history = candidate.get("career_history", [])

    for job in history:

        text = (
            job.get("description", "") + " " +
            job.get("title", "")
        ).lower()

        # AI evidence
        for word in AI_TERMS:
            if word in text:
                score += 3

        # Production evidence
        for word in PRODUCTION_TERMS:
            if word in text:
                score += 2

        # Weak evidence
        for word in NEGATIVE_TERMS:
            if word in text:
                score -= 2

        # Current job bonus
        if job.get("is_current"):
            score += 5

        # Long tenure bonus
        months = job.get("duration_months", 0)

        if months >= 24:
            score += 4

        elif months >= 12:
            score += 2

    return score