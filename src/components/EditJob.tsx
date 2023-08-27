import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CreateEditJobForm, { IJob } from './NewJob';
import { Spin } from 'antd';

const EditJob: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [jobDetails, setJobDetails] = useState<IJob | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/jobs/${id}`);
                console.log(response.data)
                setJobDetails(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchJobs();
    }, [id]);

    if (!jobDetails) {
        return <Spin />;
    }

    return <CreateEditJobForm jobData={jobDetails} />;
};

export default EditJob;
