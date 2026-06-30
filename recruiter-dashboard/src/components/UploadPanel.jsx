import { useEffect, useState } from "react";
import { Upload, CheckCircle2 } from "lucide-react";
import { rankCandidates } from "../api";

export default function UploadPanel({ onResults }) {

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);

    const steps = [
        "Reading Job Description...",
        "Extracting Skills...",
        "Semantic Matching...",
        "Ranking 100,000 Candidates...",
        "Building Final Shortlist..."
    ];

    useEffect(() => {

        if (!loading) return;

        let current = 0;

        const timer = setInterval(() => {

            current++;

            if (current < steps.length) {

                setStep(current);

            }

        }, 1000);

        return () => clearInterval(timer);

    }, [loading]);

    async function handleUpload(e) {

        const file = e.target.files[0];

        if (!file) return;

        try {

            setLoading(true);
            setStep(0);

            const result = await rankCandidates(file);

            if (result.success) {

                setStep(steps.length - 1);

                setTimeout(() => {

                    onResults(result.candidates);

                    setLoading(false);

                }, 700);

            }

        } catch (err) {

            console.error(err);

            alert("Backend Error");

            setLoading(false);

        }

    }

    return (

        <div className="mt-10">

            <label className="glass glow flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-blue-500 p-8">

                {

                    !loading ?

                    <>

                        <Upload
                            size={60}
                            className="text-blue-500"
                        />

                        <h2 className="mt-5 text-3xl font-bold">

                            Upload Job Description

                        </h2>

                        <p className="mt-3 text-slate-400">

                            PDF • DOCX • TXT

                        </p>

                    </>

                    :

                    <div className="w-full max-w-xl">

                        <h2 className="mb-8 text-center text-3xl font-bold">

                            AI Processing...

                        </h2>

                        {

                            steps.map((item, index) => (

                                <div
                                    key={item}
                                    className="mb-4"
                                >

                                    <div className="mb-2 flex items-center gap-3">

                                        <CheckCircle2
                                            size={20}
                                            className={
                                                index <= step
                                                    ? "text-green-400"
                                                    : "text-slate-600"
                                            }
                                        />

                                        <span
                                            className={
                                                index <= step
                                                    ? "text-white"
                                                    : "text-slate-500"
                                            }
                                        >

                                            {item}

                                        </span>

                                    </div>

                                    <div className="h-2 rounded-full bg-slate-800">

                                        <div
                                            className={`h-2 rounded-full bg-blue-500 transition-all duration-700 ${
                                                index <= step
                                                    ? "w-full"
                                                    : "w-0"
                                            }`}
                                        />

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                }

                <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleUpload}
                />

            </label>

        </div>

    );

}