import { useState } from "react";
import CandidateCard from "./CandidateCard";
import SearchBar from "./SearchBar";
import ExportButton from "./ExportButton";

export default function ResultsPage({ candidates }) {

    const [search, setSearch] = useState("");
    const [minMatch, setMinMatch] = useState(0);

    const filteredCandidates = candidates.filter((candidate) => {

        const matchesSearch = candidate.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesScore = candidate.match >= minMatch;

        return matchesSearch && matchesScore;

    });

    const topMatch =
        filteredCandidates.length > 0
            ? Math.max(...filteredCandidates.map(c => c.match)).toFixed(1)
            : "0";

    const avgMatch =
        filteredCandidates.length > 0
            ? (
                filteredCandidates.reduce(
                    (sum, c) => sum + c.match,
                    0
                ) / filteredCandidates.length
            ).toFixed(1)
            : "0";

    const avgExperience =
        filteredCandidates.length > 0
            ? (
                filteredCandidates.reduce(
                    (sum, c) => sum + c.experience,
                    0
                ) / filteredCandidates.length
            ).toFixed(1)
            : "0";

    return (

        <div className="mx-auto max-w-7xl py-10">

            <div className="mb-10 flex items-center justify-between">

                <div>

                    <h1 className="text-5xl font-black">
                        AI Recruitment Dashboard
                    </h1>

                    <p className="mt-3 text-slate-400">
                        Intelligent candidate ranking using semantic AI,
                        recruiter signals and career progression.
                    </p>

                </div>

                <ExportButton
                    candidates={filteredCandidates}
                />

            </div>

            <SearchBar
                search={search}
                setSearch={setSearch}
                minMatch={minMatch}
                setMinMatch={setMinMatch}
            />

            <div className="mb-10 grid grid-cols-4 gap-6">

                <div className="glass rounded-2xl p-6">

                    <div className="text-slate-400">
                        Candidates Ranked
                    </div>

                    <div className="mt-3 text-5xl font-black">
                        100K
                    </div>

                </div>

                <div className="glass rounded-2xl p-6">

                    <div className="text-slate-400">
                        Showing
                    </div>

                    <div className="mt-3 text-5xl font-black">
                        {filteredCandidates.length}
                    </div>

                </div>

                <div className="glass rounded-2xl p-6">

                    <div className="text-slate-400">
                        Top Match
                    </div>

                    <div className="mt-3 text-5xl font-black text-blue-400">
                        {topMatch}%
                    </div>

                </div>

                <div className="glass rounded-2xl p-6">

                    <div className="text-slate-400">
                        Avg Experience
                    </div>

                    <div className="mt-3 text-5xl font-black text-green-400">
                        {avgExperience} yrs
                    </div>

                </div>

            </div>

            <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4">

                <div className="font-bold text-green-400">
                    AI Summary
                </div>

                <p className="mt-2 text-slate-300">

                    Showing <b>{filteredCandidates.length}</b> candidates.
                    Average Match Score: <b>{avgMatch}%</b>.
                    Highest Match: <b>{topMatch}%</b>.

                </p>

            </div>

            {

                filteredCandidates.length === 0 && (

                    <div className="glass rounded-2xl p-10 text-center text-slate-400">

                        No candidates match your filters.

                    </div>

                )

            }

            <div className="grid gap-6">

                {

                    filteredCandidates.map(candidate => (

                        <CandidateCard
                            key={candidate.id}
                            candidate={candidate}
                        />

                    ))

                }

            </div>

        </div>

    );

}