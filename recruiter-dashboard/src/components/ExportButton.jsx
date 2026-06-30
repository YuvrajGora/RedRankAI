import { Download } from "lucide-react";

export default function ExportButton({ candidates }) {

    function exportCSV() {

        if (!candidates.length) {

            alert("No candidates to export.");
            return;

        }

        const header =
            "Candidate ID,Title,Match %,Experience,Reason\n";

        const rows = candidates.map(c =>

            `"${c.id}","${c.title}",${c.match},${c.experience},"${c.reason}"`

        );

        const csv = header + rows.join("\n");

        const blob = new Blob(
            [csv],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "ranked_candidates.csv";

        link.click();

        URL.revokeObjectURL(url);

    }

    return (

        <button
            onClick={exportCSV}
            className="glass flex items-center gap-3 rounded-xl px-6 py-3 font-semibold transition hover:scale-105 hover:bg-blue-600"
        >

            <Download size={20} />

            Export CSV

        </button>

    );

}