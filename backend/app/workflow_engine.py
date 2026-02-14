import json
from .steps import STEP_REGISTRY


def execute_workflow(steps_json, input_text):
    """
    steps_json -> JSON string from DB
    input_text -> user input text
    """

    steps = json.loads(steps_json)

    current_text = input_text
    step_outputs = []

    for step in steps:
        step_type = step.get("type")

        if step_type not in STEP_REGISTRY:
            step_outputs.append({
                "step": step_type,
                "error": "Unknown step type"
            })
            continue

        try:
            result = STEP_REGISTRY[step_type](current_text)

            step_outputs.append({
                "step": step_type,
                "output": result
            })

            # Pass output to next step
            if isinstance(result, list):
                current_text = " ".join(result)
            else:
                current_text = str(result)

        except Exception as e:
            step_outputs.append({
                "step": step_type,
                "error": str(e)
            })

    return {
        "final_output": current_text,
        "step_outputs": step_outputs
    }
