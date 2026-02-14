import { useEffect, useState } from "react";
import { getSystemHealth } from "../services/api";

export default function Status() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHealth();
  }, []);

  const loadHealth = async () => {
    try {
      const res = await getSystemHealth();
      setHealth(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div style={{ padding: 40 }}>Checking system health...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">System Status</h2>
        <p className="text-gray-400">
          Monitor backend, database and AI connectivity
        </p>
      </div>

      {health && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#151515] border border-gray-800 rounded-xl p-6">
            <h3 className="text-sm text-gray-400">Backend</h3>
            <p className="text-lg font-semibold text-green-400 mt-2">
              {health.backend}
            </p>
          </div>

          <div className="bg-[#151515] border border-gray-800 rounded-xl p-6">
            <h3 className="text-sm text-gray-400">Database</h3>
            <p className="text-lg font-semibold text-green-400 mt-2">
              {health.database}
            </p>
          </div>

          <div className="bg-[#151515] border border-gray-800 rounded-xl p-6">
            <h3 className="text-sm text-gray-400">LLM</h3>
            <p className="text-lg font-semibold text-green-400 mt-2">
              {health.llm?.status || "Unknown"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
