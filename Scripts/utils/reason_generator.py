def generate_reason(candidate, score):

    profile = candidate["profile"]
    signals = candidate["redrob_signals"]

    top_skills = ", ".join(
        skill["name"]
        for skill in candidate["skills"][:4]
    )

    return (
        f"{profile['current_title']} with "
        f"{profile['years_of_experience']} years experience. "
        f"Strong production background. "
        f"Key skills: {top_skills}. "
        f"GitHub Activity: {signals['github_activity_score']}. "
        f"Recruiter Response Rate: {signals['recruiter_response_rate']:.2f}."
    )