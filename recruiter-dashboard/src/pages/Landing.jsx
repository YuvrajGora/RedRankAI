import Navbar from "../components/Navbar";
import UploadPanel from "../components/UploadPanel";
import AnalysisPanel from "../components/AnalysisPanel";

export default function Landing() {

  return (

    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      <Navbar/>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-14 px-8 py-16">

        <div>

          <h1 className="text-7xl font-black leading-tight">

            Hire Better

            <span className="block text-blue-500">

              using AI

            </span>

          </h1>

          <p className="mt-6 text-xl text-slate-400">

            Rank 100,000 candidates in seconds using
            semantic AI, recruiter signals and intelligent reasoning.

          </p>

          <UploadPanel/>

        </div>

        <AnalysisPanel/>

      </div>

    </div>

  );

}