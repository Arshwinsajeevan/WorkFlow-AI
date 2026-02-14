import os
from dotenv import load_dotenv

load_dotenv()

AI_MODE = os.getenv("AI_MODE", "mock")
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "mock")
LLM_API_KEY = os.getenv("LLM_API_KEY")


# --- OPTIONAL GROQ IMPORT ---
try:
    from groq import Groq
    groq_client = Groq(api_key=LLM_API_KEY) if LLM_API_KEY else None
except:
    groq_client = None


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


# --- REAL LLM CALL ---
def groq_chat(prompt):
    if not groq_client:
        return None

    try:
        completion = groq_client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
        )

        return completion.choices[0].message.content
    except Exception:
        return None


# --- PUBLIC AI FUNCTIONS ---

def ai_summarize(text):
    if AI_MODE == "real" and LLM_PROVIDER == "groq":
        prompt = f"Summarize this text in 3-4 lines:\n{text}"
        result = groq_chat(prompt)
        if result:
            return result

    return mock_summarize(text)


def ai_extract_points(text):
    if AI_MODE == "real" and LLM_PROVIDER == "groq":
        prompt = f"Extract 3 key bullet points from:\n{text}"
        result = groq_chat(prompt)
        if result:
            return result

    return mock_extract_points(text)


def ai_tag_category(text):
    if AI_MODE == "real" and LLM_PROVIDER == "groq":
        prompt = f"Classify this text into one category: Technology, Finance, Health, General:\n{text}"
        result = groq_chat(prompt)
        if result:
            return result

    return mock_tag_category(text)
