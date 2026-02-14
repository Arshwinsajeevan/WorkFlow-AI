import { useState, useEffect } from "react";
import { getWorkflows, runWorkflow } from "../services/api";

export default function Run() {
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState("");
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleRun = async () => {
    if (!selectedWorkflowId || !inputText) {
      alert("Select workflow and enter text");
      return;
    }

    try {
      setLoading(true);

      const res = await runWorkflow({
        workflow_id: Number(selectedWorkflowId),
        input_text: inputText,
      });

      setResult(JSON.parse(res.data.outputs_json));
    } catch (err) {
      console.error(err);
      alert("Run failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Run Workflow</h2>
        <p className="text-gray-400">
          Execute workflows and view step-by-step outputs
        </p>
      </div>

      {/* Run Card */}
      <div className="bg-[#151515] border border-gray-800 rounded-xl p-6 space-y-5">
        <div>
          <label className="text-sm text-gray-400">Select Workflow</label>
          <select
            value={selectedWorkflowId}
            onChange={(e) => setSelectedWorkflowId(e.target.value)}
            className="mt-2 w-full md:w-96 bg-black border border-gray-700 rounded-lg px-4 py-2"
          >
            <option value="">Select workflow</option>
            {workflows.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-400">Input Text</label>
          <textarea
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="mt-2 w-full bg-black border border-gray-700 rounded-lg px-4 py-2"
          />
        </div>

        <button
          onClick={handleRun}
          disabled={loading}
          className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg font-medium transition disabled:opacity-50"
        >
          {loading ? "Running..." : "Run Workflow"}
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Final Output */}
          <div className="bg-green-900/20 border border-green-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              Final Output
            </h3>
            <p className="text-gray-200 whitespace-pre-wrap">
              {result.final_output}
            </p>
          </div>

          {/* Step Outputs */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Step Outputs</h3>

            <div className="space-y-4">
              {result.step_outputs.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-[#151515] border border-gray-800 rounded-lg p-4"
                >
                  <div className="text-green-400 font-medium mb-2">
                    {s.step.replace("_", " ")}
                  </div>

                  <div className="whitespace-pre-wrap text-sm text-gray-300">
                    {typeof s.output === "string"
                      ? s.output
                      : JSON.stringify(s.output, null, 2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
