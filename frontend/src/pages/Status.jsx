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

  if (loading) return <div style={{ padding: 40 }}>Checking system health...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h2>System Status</h2>

      {health && (
        <div>

          <h3>Backend</h3>
          <p>{health.backend}</p>

          <h3>Database</h3>
          <p>{health.database}</p>

          <h3>LLM</h3>
          <pre>{JSON.stringify(health.llm, null, 2)}</pre>

        </div>
      )}

    </div>
  );
}
