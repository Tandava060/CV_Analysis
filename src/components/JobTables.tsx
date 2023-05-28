// JobsTable.tsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Space, Tooltip } from 'antd';
import { EyeOutlined, TeamOutlined, UserDeleteOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

export const JobsTable: React.FC = () => {
    const [jobs, setJobs] = useState<UIJob[]>([]);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/jobs');
            setJobs(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (record: UIJob) => {
        form.setFieldsValue(record);
        setVisible(true);
    };

    const handleDelete = (record: UIJob) => {
        // Implement delete logic here
    };

    const handleOk = () => {
        // Implement create/update logic here
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Company',
            dataIndex: 'company',
        },
        {
            title: 'Domain',
            dataIndex: 'field',
        },
        {
            title: 'Action',
            render: (_: any, record: UIJob) => (
                <Space size="middle">
                    <Tooltip title="View Job">
                        <Button shape="circle" icon={<EyeOutlined />} />
                    </Tooltip>
                    <Tooltip title="Candidates">
                        <Link to={`${record.id}/candidates`}>
                            <Button shape="circle" icon={<TeamOutlined />} />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Edit Job">
                        <Button shape="circle" icon={<EditOutlined />} />
                    </Tooltip>
                    <Tooltip title="Delete Job">
                        <Button shape="circle" icon={<DeleteOutlined />} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "end", marginBottom: '20px' }}>
                <Link to='new'> <Button icon={<PlusOutlined />} type="primary">
                    Add Job
                </Button></Link>
            </div>

            <Table pagination={{ pageSize: 10, position: ['bottomCenter'] }} columns={columns} dataSource={jobs} rowKey="id" />
        </div>
    );
};
