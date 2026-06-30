import { useState } from "react";
import Navbar from "../components/Navbar";
import UploadPanel from "../components/UploadPanel";
import ResultsPage from "../components/ResultsPage";

export default function Dashboard() {

    const [candidates, setCandidates] = useState([]);

    function handleResults(data) {

        console.log("Received:", data);

        setCandidates(data);

    }

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <div className="mx-auto max-w-7xl px-8 py-8">

                <UploadPanel
                    onResults={handleResults}
                />

                {candidates.length > 0 && (

                    <div className="mt-12">

                        <ResultsPage
                            candidates={candidates}
                        />

                    </div>

                )}

            </div>

        </div>

    );

}