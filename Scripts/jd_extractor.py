import re
from docx import Document
from PyPDF2 import PdfReader

SKILLS = [
    "Python","Java","C++","JavaScript","TypeScript","React",
    "Node.js","Express","Flask","FastAPI","Django","TensorFlow",
    "PyTorch","Machine Learning","Deep Learning","LLM","LangChain",
    "RAG","Vector Database","FAISS","Pinecone","Docker",
    "Kubernetes","AWS","Azure","GCP","SQL","MongoDB",
    "PostgreSQL","Git"
]

TITLES = [
    "Machine Learning Engineer",
    "AI Engineer",
    "Data Scientist",
    "Software Engineer",
    "Backend Engineer",
    "Frontend Engineer",
    "Full Stack Developer",
    "Python Developer",
    "DevOps Engineer"
]


def extract_text(filepath):

    path = filepath.lower()

    if path.endswith(".txt"):

        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()

    elif path.endswith(".docx"):

        doc = Document(filepath)

        return "\n".join(
            p.text for p in doc.paragraphs
        )

    elif path.endswith(".pdf"):

        pdf = PdfReader(filepath)

        text = ""

        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:

                text += page_text + "\n"

        return text

    return ""


def extract_requirements(text):

    text = text.lower()

    skills = []

    for skill in SKILLS:

        if skill.lower() in text:

            skills.append(skill)

    titles = []

    for title in TITLES:

        if title.lower() in text:

            titles.append(title)

    if not titles:

        titles = ["Software Engineer"]

    return {

        "required_titles": titles,
        "required_skills": skills,
        "preferred_experience": [3, 10]

    }