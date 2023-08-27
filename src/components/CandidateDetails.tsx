import { Col, Descriptions, Divider, Progress, Row } from "antd";
import { UICandidate } from "./UICandidate";
import Speedometer from "./Speedometer";
import PieChart from "./PieChart";

export const CandidateDetails: React.FC<{ selectedCandidate: UICandidate }> = ({
    selectedCandidate,
}) => {

    const speedometerId = `gauge-chart-${selectedCandidate.id}`;


    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 style={{ color: "GrayText" }}>{selectedCandidate.name}</h2>
                <Speedometer percentage={selectedCandidate.total_score} id={speedometerId} />
            </div>

            <Descriptions column={1}>
                <Descriptions.Item label="Email">
                    {selectedCandidate.email ? selectedCandidate.email : "none"}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                    {selectedCandidate.phone ? selectedCandidate.phone : "none"}{" "}
                </Descriptions.Item>
                <Descriptions.Item label="LinkedIn">
                    {selectedCandidate.linkedin ? selectedCandidate.linkedin : "none"}
                </Descriptions.Item>
                <Descriptions.Item label="Skills">
                    {selectedCandidate.skills.length > 0
                        ? selectedCandidate.skills.join(", ")
                        : "none"}
                </Descriptions.Item>
                <Descriptions.Item label="Languages">
                    {selectedCandidate.languages.length > 0
                        ? selectedCandidate.languages.join(", ")
                        : "none"}
                </Descriptions.Item>
                <Descriptions.Item label="Certifications">
                    {selectedCandidate.certifications.length > 0
                        ? selectedCandidate.certifications.join(", ")
                        : "none"}
                </Descriptions.Item>
                <Descriptions.Item label="Educations">
                    {selectedCandidate.educations.length > 0
                        ? selectedCandidate.educations.join(", ")
                        : "none"}
                </Descriptions.Item>
                <Descriptions.Item label="Positions">
                    {selectedCandidate.positions.length > 0
                        ? selectedCandidate.positions.join(", ")
                        : "none"}
                </Descriptions.Item>
            </Descriptions>

            <Divider />

            <h2 style={{ textAlign: "center", color: "GrayText" }}>Statistics</h2>

            <div style={{ margin: '4% auto 10% auto', width: "50%" }}>
                <PieChart selectedCandidate={selectedCandidate} />
            </div>


            <div style={{ width: "90%", margin: "auto" }}>
                {selectedCandidate.job_skills_weight > 0 && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <p style={{ width: "60%" }}>Skills Weightage:</p>
                        <Progress
                            percent={selectedCandidate.skills_weight}
                            format={() => `${selectedCandidate.skills_weight.toFixed(2)}%`}
                        />
                    </div>
                )}

                {selectedCandidate.job_year_exp_weight > 0 && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <p style={{ width: "60%" }}>Years of Experience Weightage:</p>
                        <Progress
                            percent={selectedCandidate.job_year_exp_weight}
                            format={() => `${selectedCandidate.job_year_exp_weight.toFixed(2)}%`}
                        />
                    </div>
                )}

                {selectedCandidate.job_languages_weight > 0 && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <p style={{ width: "60%" }}>Languages Weightage:</p>
                        <Progress
                            percent={selectedCandidate.languages_weight}
                            format={() => `${selectedCandidate.languages_weight.toFixed(2)}%`}
                        />
                    </div>
                )}

                {selectedCandidate.job_positions_weight > 0 && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <p style={{ width: "60%" }}>Positions Weightage:</p>
                        <Progress
                            percent={selectedCandidate.positions_weight}
                            format={() => `${selectedCandidate.positions_weight.toFixed(2)}%`}
                        />
                    </div>
                )}

                {selectedCandidate.job_education_weight > 0 && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <p style={{ width: "60%" }}>Education Weightage:</p>
                        <Progress
                            percent={selectedCandidate.education_weight}
                            format={() => `${selectedCandidate.education_weight.toFixed(2)}%`}
                        />
                    </div>
                )}

                {selectedCandidate.job_certificates_weight > 0 && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <p style={{ width: "60%" }}>Certificates Weightage:</p>
                        <Progress
                            percent={selectedCandidate.certificates_weight}
                            format={() =>
                                `${selectedCandidate.certificates_weight.toFixed(2)}%`
                            }
                        />
                    </div>
                )}
            </div>


        </>
    );
};
