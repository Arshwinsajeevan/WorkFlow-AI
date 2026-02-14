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
    <div className="space-y-8">

  {/* Header */}
  <div>
    <h2 className="text-3xl font-bold">Workflow Builder</h2>
    <p className="text-gray-400 mt-1">
      Create modular AI workflows using processing steps
    </p>
  </div>

  {/* Create Card */}
  <div className="bg-[#151515] border border-gray-800 rounded-xl p-6 space-y-5 hover:border-green-700 hover:shadow-lg hover:shadow-green-900/10 transition">

    <input
      placeholder="Workflow Name"
      value={workflowName}
      onChange={(e) => setWorkflowName(e.target.value)}
      className="w-full md:w-96 bg-black border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
    />

    <div>
      <h3 className="font-semibold mb-3">Select Steps</h3>

      <div className="flex flex-wrap gap-3">
        {availableSteps.map(step => (
          <button
            key={step}
            onClick={() => toggleStep(step)}
            className={`px-4 py-2 rounded-lg border transition text-sm
              ${selectedSteps.includes(step)
                ? "bg-green-600 border-green-600"
                : "bg-gray-800 border-gray-700 hover:bg-gray-700"
              }`}
          >
            {step.replace("_", " ")}
          </button>
        ))}
      </div>
    </div>

    <button
      onClick={handleCreateWorkflow}
      className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg font-medium transition"
    >
      Create Workflow
    </button>

  </div>

  {/* Existing Workflows */}
  <div className="bg-[#151515] border border-gray-800 rounded-xl p-6">
    <h3 className="text-xl font-semibold mb-4">Existing Workflows</h3>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {workflows.map(w => (
        <div
          key={w.id}
          className="bg-black border border-gray-800 rounded-lg p-4 hover:border-green-600 transition"
        >
          <div className="font-medium">{w.name}</div>
        </div>
      ))}
    </div>

  </div>

</div>

  );
}
