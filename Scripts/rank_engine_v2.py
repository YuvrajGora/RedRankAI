import json
from tqdm import tqdm

DATASET_PATH = "Data/candidates.jsonl"

TARGET_EXPERIENCE = (5, 9)

AI_SKILLS = {
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "LLM",
    "Fine-tuning LLMs",
    "LoRA",
    "PEFT",
    "Embeddings",
    "Vector Databases",
    "Milvus",
    "Pinecone",
    "Qdrant",
    "FAISS",
    "Weaviate",
    "Retrieval",
    "RAG",
    "LangChain",
    "TensorFlow",
    "PyTorch",
    "MLflow",
    "BentoML",
    "Kubeflow",
    "OpenSearch",
    "Elasticsearch"
}

GOOD_TITLES = {
    "AI Engineer",
    "Machine Learning Engineer",
    "ML Engineer",
    "Senior AI Engineer"
}