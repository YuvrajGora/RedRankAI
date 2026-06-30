import { useState } from "react";
import {
    Trophy,
    Briefcase,
    Brain,
    ChevronRight
} from "lucide-react";

import CandidateModal from "./CandidateModal";

export default function CandidateCard({ candidate }) {

    const [open, setOpen] = useState(false);

    const hireLabel =
        candidate.match >= 85
            ? "Strong Hire"
            : candidate.match >= 70
            ? "Hire"
            : "Consider";

    const hireColor =
        candidate.match >= 85
            ? "text-green-400"
            : candidate.match >= 70
            ? "text-blue-400"
            : "text-yellow-400";

    return (

        <>

            <div
                onClick={() => setOpen(true)}
                className="glass glow cursor-pointer rounded-3xl border border-slate-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-2xl"
            >

                <div className="flex items-center justify-between">

                    <div>

                        <div className="text-sm font-semibold text-blue-400">

                            {candidate.id}

                        </div>

                        <h2 className="mt-2 text-3xl font-bold">

                            {candidate.title}

                        </h2>

                    </div>

                    <ChevronRight
                        className="text-slate-500"
                    />

                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">

                    <div className="rounded-xl bg-slate-900 p-4">

                        <Trophy
                            size={24}
                            className="mb-2 text-yellow-400"
                        />

                        <div className="text-slate-400">

                            Match

                        </div>

                        <div className="text-3xl font-black text-blue-400">

                            {candidate.match}%

                        </div>

                    </div>

                    <div className="rounded-xl bg-slate-900 p-4">

                        <Briefcase
                            size={24}
                            className="mb-2 text-cyan-400"
                        />

                        <div className="text-slate-400">

                            Experience

                        </div>

                        <div className="text-3xl font-black">

                            {candidate.experience}

                        </div>

                    </div>

                    <div className="rounded-xl bg-slate-900 p-4">

                        <Brain
                            size={24}
                            className="mb-2 text-purple-400"
                        />

                        <div className="text-slate-400">

                            AI Decision

                        </div>

                        <div className={`text-xl font-bold ${hireColor}`}>

                            {hireLabel}

                        </div>

                    </div>

                </div>

                <div className="mt-6 flex flex-wrap gap-2">

                    {

                        candidate.skills.map(skill => (

                            <span
                                key={skill}
                                className="rounded-full bg-blue-600 px-3 py-1 text-sm"
                            >

                                {skill}

                            </span>

                        ))

                    }

                </div>

                <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900 p-4">

                    <div className="mb-2 font-bold text-green-400">

                        AI Explanation

                    </div>

                    <p className="line-clamp-2 text-slate-300">

                        {candidate.reason}

                    </p>

                </div>

            </div>

            <CandidateModal
                candidate={open ? candidate : null}
                onClose={() => setOpen(false)}
            />

        </>

    );

}