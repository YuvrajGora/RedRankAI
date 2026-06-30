import { X, Briefcase, Award, Brain } from "lucide-react";

export default function CandidateModal({ candidate, onClose }) {

    if (!candidate) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div className="glass w-[800px] rounded-3xl border border-slate-700 bg-slate-900 p-8">

                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold">

                            {candidate.title}

                        </h1>

                        <p className="mt-2 text-slate-400">

                            {candidate.id}

                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full bg-slate-800 p-3 hover:bg-slate-700"
                    >

                        <X size={24} />

                    </button>

                </div>

                <div className="grid grid-cols-3 gap-5">

                    <div className="rounded-2xl bg-slate-800 p-5">

                        <Briefcase
                            size={28}
                            className="text-blue-400"
                        />

                        <h3 className="mt-3 text-slate-400">

                            Experience

                        </h3>

                        <div className="mt-2 text-3xl font-bold">

                            {candidate.experience} yrs

                        </div>

                    </div>

                    <div className="rounded-2xl bg-slate-800 p-5">

                        <Award
                            size={28}
                            className="text-green-400"
                        />

                        <h3 className="mt-3 text-slate-400">

                            Match Score

                        </h3>

                        <div className="mt-2 text-3xl font-bold">

                            {candidate.match}%

                        </div>

                    </div>

                    <div className="rounded-2xl bg-slate-800 p-5">

                        <Brain
                            size={28}
                            className="text-purple-400"
                        />

                        <h3 className="mt-3 text-slate-400">

                            AI Decision

                        </h3>

                        <div className="mt-2 text-lg font-semibold">

                            Selected

                        </div>

                    </div>

                </div>

                <div className="mt-8">

                    <h2 className="mb-3 text-xl font-bold">

                        Skills

                    </h2>

                    <div className="flex flex-wrap gap-3">

                        {

                            candidate.skills.map(skill => (

                                <span
                                    key={skill}
                                    className="rounded-full bg-blue-600 px-4 py-2"
                                >

                                    {skill}

                                </span>

                            ))

                        }

                    </div>

                </div>

                <div className="mt-8">

                    <h2 className="mb-3 text-xl font-bold">

                        AI Explanation

                    </h2>

                    <div className="rounded-2xl bg-slate-800 p-5 leading-8 text-slate-300">

                        {candidate.reason}

                    </div>

                </div>

            </div>

        </div>

    );

}