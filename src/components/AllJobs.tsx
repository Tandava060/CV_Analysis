import React, { useEffect, useState } from 'react';
import { List, Button, Card, Row, Col, Typography, Form, Input, Modal, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ApplyJob } from './ApplyJob';

const { Title, Paragraph, Text } = Typography;

export interface Job {
  id: string;
  title: string;
  shortDes: string;
  skills: string[];
  company: string;
  field: string;
  languages: string[];
  educationLevel: string;
}

export const AllJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/jobs');
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  const applyForJob = (job: Job) => {
    setIsModalVisible(true);
    setSelectedJob(job);
  };

  return (
    <div>
      {jobs.map((job: Job) => (
        <Card
          key={job.id}
          title={<Title level={4}>{job.title}</Title>}
          style={{ marginBottom: 16 }}
        >
          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <Text strong>Company: </Text><Text style={{ paddingBottom: '30px' }}>{job.company}</Text><br />
            <div style={{ marginBottom: '1rem' }}>
              <Text strong>Category: </Text><Text>{job.field}</Text>
            </div>
            <Paragraph style={{ color: "rgb(48 45 45 / 88%)" }}>{job.shortDes}</Paragraph>
            <Text strong>Skills: </Text><Text>{job.skills.join(', ')}</Text>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button type="primary" style={{ marginRight: 16 }} onClick={() => applyForJob(job)}>Apply</Button>
            <Link to={job.id}>
              <Button>Details</Button></Link>
          </div>
        </Card>
      ))}

      {selectedJob && (
        <ApplyJob
          jobId={selectedJob.id}
          jobTitle={selectedJob.title}
          visible={isModalVisible}
          setdata={setIsModalVisible}
        />
      )}
    </div>
  );
};

