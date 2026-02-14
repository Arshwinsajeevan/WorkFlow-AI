export default function Home() {
  return (
    <div className="space-y-10 pt-5 mt-5">
      <div>
        <h1 className="text-4xl pt-5 mt-5 font-bold">Workflow Builder Lite</h1>

        <p className="text-gray-400 mt-2 max-w-xl">
          Build, run and track AI-native workflows with step level execution
          visibility.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-[#151515] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Builder</h3>
          <p className="text-gray-400 text-sm">
            Create modular workflows using reusable processing steps.
          </p>
        </div>

        <div className="bg-[#151515] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Run</h3>
          <p className="text-gray-400 text-sm">
            Execute workflows and observe step-by-step outputs.
          </p>
        </div>

        <div className="bg-[#151515] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">History</h3>
          <p className="text-gray-400 text-sm">
            Review previous workflow executions and outputs.
          </p>
        </div>
      </div>
    </div>
  );
}
