import React, { useState, useEffect } from 'react';
import { Typography, Button, Modal, Form, Input, Upload, message, Space, Tag, Divider, Spin } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { ApplyJob } from './ApplyJob';
import { Link, useParams } from 'react-router-dom';
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
}

export const JobDescription = () => {
    const [job, setJob] = useState<UIJob | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Get id from route params
    const { id } = useParams<{ id: string }>();

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

    // If job data hasn't loaded yet, render loading state
    if (!job) {
        return <Spin />;
    }


    return (
        <Spin spinning={!job}>
            <Space style={{ marginTop: 16, display: 'flex' }}>
                <Link to={"/jobs"}><Button icon={<ArrowLeftOutlined />} type="link" size="large">All Jobs</Button></Link>
                
            </Space>
              <div>
            <Title>{job.title}  - {job.company}</Title>
            <Tag color="blue">{job.field}</Tag>

            <Divider />
            <Space style={{ marginTop: 16, display: 'flex', justifyContent: "end" }}>
                <Button icon={<ArrowRightOutlined />} type="primary" size="large" onClick={applyForJob}>Apply</Button>
            </Space>
            <div style={{ textAlign: 'left' }}>
                <Title level={4}>Job Description</Title>
                <Paragraph>{job.description}</Paragraph>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <Title style={{ marginRight: "10px" }} level={5}>Skills Required: </Title>
                    {job.skills.map((skill, i) => {
                        return (<Tag key={i} color="red">{skill}</Tag>)
                    })}
                </div>

                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <Title style={{ marginRight: "10px" }} level={5}>Certificates: </Title>
                    {job.certificates.map((certificate, i) => {
                        return (<Tag key={i} color="purple">{certificate}</Tag>)
                    })}
                </div>

                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <Title style={{ marginRight: "10px" }} level={5}>Years of Experience: </Title>
                    <Text>{job.yearsExp}</Text><br />
                </div>

                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <Title style={{ marginRight: "10px" }} level={5}>Level of Education: </Title>
                    <Text>{job.educationLevel}</Text><br />
                </div>

                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <Title style={{ marginRight: "10px" }} level={5}>Languages: </Title>
                    {job.languages.map((langauge, i) => {
                        return (<Tag key={i} color="purple">{langauge}</Tag>)
                    })}
                </div>
            </div>



            <ApplyJob jobId={job.id} jobTitle={job.title} visible={isModalVisible} setdata={setIsModalVisible} />
        </div>
        </Spin>
      
    );
};