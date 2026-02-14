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
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Run History</h2>
        <p className="text-gray-400">Review recent workflow executions</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT RUN LIST */}
        <div className="bg-[#151515] border border-gray-800 rounded-xl p-5">
          <h3 className="font-semibold mb-4">Recent Runs</h3>

          <div className="space-y-3">
            {runs.map((run) => (
              <div
                key={run.id}
                onClick={() => handleSelectRun(run)}
                className="bg-black border border-gray-800 rounded-lg p-3 cursor-pointer hover:border-green-600 transition"
              >
                Run #{run.id}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div className="lg:col-span-2 bg-[#151515] border border-gray-800 rounded-xl p-6">
          {selectedRun ? (
            <div className="space-y-6">
              <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">
                  Final Output
                </h4>
                <p className="whitespace-pre-wrap">
                  {selectedRun.final_output}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Step Outputs</h4>

                <div className="space-y-3">
                  {selectedRun.step_outputs.map((s, i) => (
                    <div
                      key={i}
                      className="bg-black border border-gray-800 rounded-lg p-3"
                    >
                      <div className="text-green-400 text-sm mb-1">
                        {s.step.replace("_", " ")}
                      </div>
                      <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                        {JSON.stringify(s.output, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              Select a run from the left to inspect results
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
