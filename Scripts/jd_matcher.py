JD_KEYWORDS = [
    "retrieval",
    "ranking",
    "embedding",
    "vector",
    "search",
    "recommendation",
    "llm",
    "rag",
    "milvus",
    "pinecone",
    "qdrant",
    "faiss",
    "weaviate",
    "langchain",
    "python",
    "backend"
]


def jd_score(candidate):

    score = 0

    text = candidate["profile"]["summary"].lower()

    for job in candidate.get("career_history", []):
        text += " "
        text += job.get("description", "").lower()

    for word in JD_KEYWORDS:
        if word in text:
            score += 6

    return score