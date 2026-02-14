import { useState, useEffect } from "react";
import { createWorkflow, getWorkflows } from "../services/api";

export default function Builder() {
  const [workflowName, setWorkflowName] = useState("");
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [workflows, setWorkflows] = useState([]);

  const availableSteps = [
    "clean_text",
    "summarize",
    "extract_points",
    "tag_category"
  ];

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    try {
      const res = await getWorkflows();
      setWorkflows(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStep = (step) => {
    if (selectedSteps.includes(step)) {
      setSelectedSteps(selectedSteps.filter(s => s !== step));
    } else {
      setSelectedSteps([...selectedSteps, step]);
    }
  };

  const handleCreateWorkflow = async () => {
    if (!workflowName || selectedSteps.length === 0) {
      alert("Enter name and select at least 1 step");
      return;
    }

    try {
      await createWorkflow({
        name: workflowName,
        steps: selectedSteps.map(s => ({ type: s }))
      });

      setWorkflowName("");
      setSelectedSteps([]);
      loadWorkflows();

      alert("Workflow created!");

    } catch (err) {
      console.error(err);
      alert("Error creating workflow");
    }
  };

  return (
    <div style={{ padding: 40 }}>

      <h2>Workflow Builder</h2>

      <input
        placeholder="Workflow Name"
        value={workflowName}
        onChange={(e) => setWorkflowName(e.target.value)}
        style={{ padding: 8, width: 300 }}
      />

      <h3>Select Steps</h3>

      <div style={{ display: "flex", gap: 10 }}>
        {availableSteps.map(step => (
          <button
            key={step}
            onClick={() => toggleStep(step)}
            style={{
              padding: 10,
              background: selectedSteps.includes(step) ? "#4CAF50" : "#ddd"
            }}
          >
            {step}
          </button>
        ))}
      </div>

      <br />

      <button onClick={handleCreateWorkflow}>
        Create Workflow
      </button>

      <hr />

      <h3>Existing Workflows</h3>

      {workflows.map(w => (
        <div key={w.id}>
          {w.name}
        </div>
      ))}

    </div>
  );
}
