from .ai_service import ai_summarize, ai_extract_points, ai_tag_category


def clean_text_step(input_text: str):
    return " ".join(input_text.split())


def summarize_step(input_text: str):
    return ai_summarize(input_text)


def extract_points_step(input_text: str):
    return ai_extract_points(input_text)


def tag_category_step(input_text: str):
    return ai_tag_category(input_text)


STEP_REGISTRY = {
    "clean_text": clean_text_step,
    "summarize": summarize_step,
    "extract_points": extract_points_step,
    "tag_category": tag_category_step,
}
