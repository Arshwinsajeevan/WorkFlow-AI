import { useEffect, useState } from "react";
import { getLatestRuns } from "../services/api";

export default function History() {

  const [runs, setRuns] = useState([]);
  const [selectedRun, setSelectedRun] = useState(null);

  useEffect(() => {
    loadRuns();
  }, []);

  const loadRuns = async () => {
    try {
      const res = await getLatestRuns();
      setRuns(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectRun = (run) => {
    setSelectedRun(JSON.parse(run.outputs_json));
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Run History (Last 5)</h2>

      <div style={{ display: "flex", gap: 40 }}>

        {/* LEFT LIST */}
        <div style={{ width: 300 }}>
          <h3>Runs</h3>

          {runs.map(run => (
            <div
              key={run.id}
              onClick={() => handleSelectRun(run)}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                marginBottom: 10,
                cursor: "pointer"
              }}
            >
              Run #{run.id}
            </div>
          ))}

        </div>

        {/* RIGHT DETAILS */}
        <div style={{ flex: 1 }}>
          <h3>Run Details</h3>

          {selectedRun ? (
            <div>
              <h4>Final Output</h4>
              <p>{selectedRun.final_output}</p>

              <h4>Step Outputs</h4>
              {selectedRun.step_outputs.map((s, idx) => (
                <div key={idx}>
                  <b>{s.step}</b>
                  <pre>{JSON.stringify(s.output, null, 2)}</pre>
                </div>
              ))}
            </div>
          ) : (
            <p>Select a run</p>
          )}

        </div>

      </div>
    </div>
  );
}
