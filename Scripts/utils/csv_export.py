import csv

def export_csv(results, filename):

    with open(filename, "w", newline="", encoding="utf-8") as file:

        writer = csv.writer(file)

        writer.writerow([
            "candidate_id",
            "rank",
            "score",
            "reasoning"
        ])

        for rank, row in enumerate(results, start=1):

            writer.writerow([
                row["candidate_id"],
                rank,
                row["score"],
                row["reason"]
            ])