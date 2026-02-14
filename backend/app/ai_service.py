import os
from dotenv import load_dotenv

load_dotenv()

AI_MODE = os.getenv("AI_MODE", "mock")


# --- MOCK IMPLEMENTATIONS ---

def mock_summarize(text):
    return text[:150] + "..." if len(text) > 150 else text


def mock_extract_points(text):
    sentences = text.split(".")
    return [s.strip() for s in sentences[:3] if s.strip()]


def mock_tag_category(text):
    text_lower = text.lower()

    if "finance" in text_lower:
        return "Finance"
    if "health" in text_lower:
        return "Health"
    if "tech" in text_lower or "ai" in text_lower:
        return "Technology"

    return "General"


# --- PUBLIC API FUNCTIONS ---

def ai_summarize(text):
    if AI_MODE == "mock":
        return mock_summarize(text)

    # Future: real LLM call here
    return mock_summarize(text)


def ai_extract_points(text):
    if AI_MODE == "mock":
        return mock_extract_points(text)

    return mock_extract_points(text)


def ai_tag_category(text):
    if AI_MODE == "mock":
        return mock_tag_category(text)

    return mock_tag_category(text)
