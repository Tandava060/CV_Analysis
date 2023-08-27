export interface UICandidate {
    id: string;
    name: string;
    resume: string;
    skills: string[];
    years_exp: number;
    languages: string[];
    certifications: string[];
    educations: string[];
    positions: string[];
    email: string;
    linkedin: string;
    phone: string;
    skills_weight: number;
    yearsExp_weight: number;
    languages_weight: number;
    positions_weight: number;
    education_weight: number;
    certificates_weight: number;
    job_skills_weight: number;
    job_year_exp_weight: number,
    job_languages_weight: number,
    job_positions_weight: number,
    job_education_weight: number,
    job_certificates_weight: number,
    total_score: number;
    job_id: string;
}
