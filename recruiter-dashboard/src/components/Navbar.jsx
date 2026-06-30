export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        <div>
          <h1 className="text-3xl font-black text-blue-500">
            RedRank AI
          </h1>

          <p className="text-sm text-slate-400">
            Intelligent Candidate Discovery
          </p>
        </div>

        <div className="flex gap-4">

          <button className="rounded-xl border border-slate-700 px-5 py-2 hover:bg-slate-800">
            Docs
          </button>

          <button className="rounded-xl bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-500">
            Hackathon Demo
          </button>

        </div>

      </div>
    </nav>
  );
}