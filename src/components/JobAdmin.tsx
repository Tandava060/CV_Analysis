import React, { useState, useEffect } from 'react';
import { Typography, Button, Table, Space, Tag, Divider, Spin } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { ApplyJob } from './ApplyJob';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const { Title, Paragraph, Text } = Typography;

interface UIJob {
    id: string;
    title: string;
    description: string;
    skills: string[];
    company: string;
    field: string;
    yearsExp: number;
    languages: string[];
    certificates: string[];
    educationLevel: string;
    skills_weight: number;
    yearsExp_weight: number;
    languages_weight: number;
    job_title_weight: number;
    education_weight: number;
    certificates_weight: number;
    score: number;
    shortDes: string;
}

export const AdminJobDescription = () => {
    const [job, setJob] = useState<UIJob | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Get id from route params
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/jobs/${id}`);
                console.log(response.data)
                setJob(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchJobs();
    }, [id]);

    const applyForJob = () => {
        setIsModalVisible(true);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const columns = [
        {
            title: 'Criterion',
            dataIndex: 'criterion',
            key: 'criterion',
        },
        {
            title: 'Weightage (%)',
            dataIndex: 'weight',
            key: 'weight',
        },
    ];




    // If job data hasn't loaded yet, render loading state
    if (!job) {
        return <Spin />;
    }

    const tableData = [
        { key: '1', criterion: 'Skills', weight: job.skills_weight },
        { key: '2', criterion: 'Years of Experience', weight: job.yearsExp_weight },
        { key: '3', criterion: 'Languages', weight: job.languages_weight },
        { key: '4', criterion: 'Job Title', weight: job.job_title_weight },
        { key: '5', criterion: 'Education', weight: job.education_weight },
        { key: '6', criterion: 'Certificates', weight: job.certificates_weight },
        // You can add more data if required
    ];

    return (
        <Spin spinning={!job}>
            <Space style={{ marginTop: 16, display: 'flex' }}>
                <Button icon={<ArrowLeftOutlined />} onClick={handleBackClick} type="link" size="large">Back</Button>
            </Space>
            <div>
                <Title>{job.title}  - {job.company}</Title>
                <Tag color="blue">{job.field}</Tag>

                <Divider />
                <div style={{ textAlign: 'left' }}>
                    <Title level={4}>Job Description</Title>
                    <div dangerouslySetInnerHTML={{ __html: job.description }}></div>


                    {job.skills.length > 0 && (<div style={{ display: "flex", alignItems: "baseline" }}>
                        <Title style={{ marginRight: "10px" }} level={5}>Skills Required: </Title>
                        {job.skills.map((skill, i) => {
                            return (<Tag key={i} color="red">{skill}</Tag>)
                        })}
                    </div>)}


                    {job.certificates.length > 0 && (<div style={{ display: "flex", alignItems: "baseline" }}>
                        <Title style={{ marginRight: "10px" }} level={5}>Certificates: </Title>
                        {job.certificates.map((certificate, i) => {
                            return (<Tag key={i} color="purple">{certificate}</Tag>)
                        })}
                    </div>)}

                    <div style={{ display: "flex", alignItems: "baseline" }}>
                        <Title style={{ marginRight: "10px" }} level={5}>Years of Experience: </Title>
                        <Text>{job.yearsExp}</Text><br />
                    </div>

                    <div style={{ display: "flex", alignItems: "baseline" }}>
                        <Title style={{ marginRight: "10px" }} level={5}>Level of Education: </Title>
                        <Text>{job.educationLevel}</Text><br />
                    </div>

                    {job.languages.length > 0 && (<div style={{ display: "flex", alignItems: "baseline" }}>
                        <Title style={{ marginRight: "10px" }} level={5}>Languages: </Title>
                        {job.languages.map((langauge, i) => {
                            return (<Tag key={i} color="purple">{langauge}</Tag>)
                        })}
                    </div>)}
                </div>



                <ApplyJob jobId={job.id} jobTitle={job.title} visible={isModalVisible} setdata={setIsModalVisible} />

                <Divider />
                <Title level={4}>Weightage and Scores</Title>
                <Table dataSource={tableData} columns={columns} pagination={false} />
                <Divider />

            </div>
        </Spin>

    );
};