import { Pie } from 'react-chartjs-2';
import { UICandidate } from './UICandidate';
import { useEffect, useRef, useState } from 'react';
import 'chart.js/auto';

const PieChart: React.FC<{ selectedCandidate: UICandidate }> = ({
    selectedCandidate,
}) => {

    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: {
            data: number[];
            backgroundColor: string[];
            hoverBackgroundColor: string[];
        }[];
    }>();

    useEffect(() => {
        const getVisibleColumnNames = () => {
            const visibleColumns: string[] = [];
            if (selectedCandidate.job_certificates_weight > 0) visibleColumns.push("Certificates");
            if (selectedCandidate.job_education_weight > 0) visibleColumns.push("Education");
            if (selectedCandidate.job_languages_weight > 0) visibleColumns.push("Languages");
            if (selectedCandidate.job_positions_weight > 0) visibleColumns.push("Positions");
            if (selectedCandidate.job_skills_weight > 0) visibleColumns.push("Skills");
            if (selectedCandidate.job_year_exp_weight > 0) visibleColumns.push("Years of Experience");
            return visibleColumns;
        }

        const visibleColumns = getVisibleColumnNames();

        const getScores = (): number[] => {
            const scores: number[] = [];
            visibleColumns.forEach((col) => {
                switch (col) {
                    case "Certificates": {
                        scores.push(selectedCandidate.certificates_weight / 100 * selectedCandidate.job_certificates_weight)
                        break;
                    }
                    case "Education": {
                        scores.push(selectedCandidate.education_weight / 100 * selectedCandidate.job_education_weight)
                        break;
                    }
                    case "Languages": {
                        scores.push(selectedCandidate.languages_weight / 100 * selectedCandidate.job_languages_weight)
                        break;
                    }
                    case "Positions": {
                        scores.push(selectedCandidate.positions_weight / 100 * selectedCandidate.job_positions_weight)
                        break;
                    }
                    case "Skills": {
                        scores.push(selectedCandidate.skills_weight / 100 * selectedCandidate.job_skills_weight)
                        break;
                    }
                    case "Years of Experience": {
                        scores.push(selectedCandidate.yearsExp_weight / 100 * selectedCandidate.job_year_exp_weight)
                        break;
                    }
                }

            })
            return scores;
        }

        const scores = getScores();

        const data = {
            labels: visibleColumns,
            datasets: [
                {
                    data: scores,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#CC65FE', '#4BC0C0', '#FF9F40'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#CC65FE', '#4BC0C0', '#FF9F40'],
                },
            ],
        };

        setChartData(data)
    }, [selectedCandidate]);





    return chartData ? <Pie data={chartData} /> : null;
};

export default PieChart;
