export async function rankCandidates(file) {

    const formData = new FormData();

    formData.append("jd", file);

    const response = await fetch(
        "http://127.0.0.1:5000/rank",
        {
            method: "POST",
            body: formData
        }
    );

    if (!response.ok) {
        throw new Error("Backend request failed.");
    }

    return await response.json();

}