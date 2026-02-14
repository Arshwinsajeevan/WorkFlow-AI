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
        input_text: inputText
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
    <div style={{ padding: 40 }}>
      <h2>Run Workflow</h2>

      <h3>Select Workflow</h3>
      <select
        value={selectedWorkflowId}
        onChange={(e) => setSelectedWorkflowId(e.target.value)}
      >
        <option value="">Select</option>
        {workflows.map(w => (
          <option key={w.id} value={w.id}>
            {w.name}
          </option>
        ))}
      </select>

      <h3>Input Text</h3>
      <textarea
        rows={6}
        cols={60}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <br /><br />

      <button onClick={handleRun} disabled={loading}>
        {loading ? "Running..." : "Run Workflow"}
      </button>

      <hr />

      {result && (
        <div>
          <h3>Final Output</h3>
          <p>{result.final_output}</p>

          <h3>Step Outputs</h3>
          {result.step_outputs.map((s, idx) => (
            <div key={idx} style={{ marginBottom: 10 }}>
              <b>{s.step}</b>
              <pre>{JSON.stringify(s.output, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
