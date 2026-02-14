import os
from dotenv import load_dotenv

load_dotenv()

AI_MODE = os.getenv("AI_MODE", "mock").lower()
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "mock").lower()
LLM_API_KEY = os.getenv("LLM_API_KEY")


print("AI CONFIG →", {
    "AI_MODE": AI_MODE,
    "LLM_PROVIDER": LLM_PROVIDER,
    "KEY_PRESENT": bool(LLM_API_KEY)
})


# ================================
# GROQ CLIENT INIT (SAFE)
# ================================
groq_client = None

if LLM_PROVIDER == "groq" and LLM_API_KEY:
    try:
        from groq import Groq
        groq_client = Groq(api_key=LLM_API_KEY)
        print("✅ Groq client initialized")
    except Exception as e:
        print("❌ Groq import/init failed:", str(e))


# ================================
# MOCK IMPLEMENTATIONS
# ================================
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


# ================================
# GROQ CALL WRAPPER (SAFE)
# ================================
def groq_chat(prompt):
    if not groq_client:
        print("⚠ GROQ CLIENT NOT INITIALIZED")
        return None

    try:
        print("🚀 Calling Groq API...")

        completion = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=300
        )

        print("Groq raw object received")

        if not completion:
            print("No completion returned")
            return None

        # SAFE EXTRACTION
        if hasattr(completion, "choices") and completion.choices:
            choice = completion.choices[0]

            if hasattr(choice, "message") and choice.message:
                msg = choice.message

                if hasattr(msg, "content") and msg.content:
                    return msg.content.strip()

                # fallback if content missing
                return str(msg)

        print("Unexpected Groq response structure")
        return None

    except Exception as e:
        print("🔥 GROQ ERROR:", str(e))
        return None

# ================================
# PUBLIC AI FUNCTIONS
# ================================
def ai_summarize(text):
    if AI_MODE == "real" and LLM_PROVIDER == "groq":
        result = groq_chat(f"Summarize this text in 3-4 lines:\n{text}")
        if result:
            return result

    return mock_summarize(text)


def ai_extract_points(text):
    if AI_MODE == "real" and LLM_PROVIDER == "groq":
        result = groq_chat(f"Extract 3 key bullet points from:\n{text}")
        if result:
            return result

    return mock_extract_points(text)


def ai_tag_category(text):
    if AI_MODE == "real" and LLM_PROVIDER == "groq":
        result = groq_chat(
            f"Classify into ONE category (Technology, Finance, Health, General):\n{text}"
        )
        if result:
            return result

    return mock_tag_category(text)


# ================================
# LLM HEALTH TEST
# ================================
def test_llm_connection():

    if AI_MODE != "real":
        return {
            "status": "mock_mode",
            "message": "Running without external LLM"
        }

    if LLM_PROVIDER == "groq":

        if not groq_client:
            return {
                "status": "error",
                "message": "Groq client not initialized"
            }

        try:
            result = groq_chat("Say OK and nothing else.")


            if result:
                return {
                    "status": "connected",
                    "provider": "groq"
                }

            return {
                "status": "failed",
                "message": "LLM returned empty response"
            }

        except Exception as e:
            return {
                "status": "error",
                "message": str(e)
            }

    return {
        "status": "unknown_provider"
    }
