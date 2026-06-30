import { Brain } from "lucide-react";

export default function AnalysisPanel() {

  return (

    <div className="glass glow rounded-3xl p-8">

      <div className="flex items-center gap-3">

        <Brain className="text-blue-500"/>

        <h2 className="text-2xl font-bold">
          AI Analysis
        </h2>

      </div>

      <div className="mt-8 space-y-6">

        <Step text="Reading Job Description" done />

        <Step text="Extracting Skills" done />

        <Step text="Semantic Matching" loading />

        <Step text="Ranking Candidates" />

      </div>

      <div className="mt-8 h-3 overflow-hidden rounded-full bg-slate-700">

        <div className="h-full w-3/4 animate-pulse rounded-full bg-blue-500"/>

      </div>

    </div>

  );

}

function Step({ text, done, loading }) {

  return (

    <div className="flex justify-between">

      <span>{text}</span>

      {done && <span>✅</span>}

      {loading && <span className="text-blue-400">Running...</span>}

      {!done && !loading && <span>⏳</span>}

    </div>

  );

}