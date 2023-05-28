import React, { useState } from 'react';
import { Input, InputNumber, Button, Form, Card, Select, message, Spin } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';

interface IJob {
    title: string;
    description: string;
    shortDes: string;
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
}

const CreateJobForm: React.FC = () => {
    const [job, setJob] = useState<IJob>({
        title: "",
        description: "",
        shortDes: "",
        skills: [],
        company: "",
        field: "",
        yearsExp: 0,
        languages: [],
        certificates: [],
        educationLevel: "",
        skills_weight: 0,
        yearsExp_weight: 0,
        languages_weight: 0,
        job_title_weight: 0,
        education_weight: 0,
        certificates_weight: 0,
    });

    const handleInputChange = (value: string | number, name: string) => {
        setJob({ ...job, [name]: value });
        form.setFieldsValue({ [name]: value });
    };

    const handleSelectChange = (name: string, value: string[]) => {
        setJob({ ...job, [name]: value });
        form.setFieldsValue({ [name]: value });
    };

    const [loading, setLoading] = useState(false);

    const [form] = useForm();

    const checkTotalWeight = () => {
        const totalWeight = job.skills_weight + job.yearsExp_weight + job.languages_weight + job.job_title_weight + job.education_weight + job.certificates_weight;
        if (totalWeight > 100) {
            return Promise.reject(new Error('The total of all weights cannot be more than 100!'));
        } else if (totalWeight < 100) {
            return Promise.reject(new Error('The total of all weights should be 100!'));
        }
        return Promise.resolve();
    };


    const handleSubmit = async () => {
        try {
            // This will throw an error if validation fails
            const values = await form.validateFields();
            console.log(values);

            setLoading(true);
            try {
                const response = await axios.post('http://127.0.0.1:8000/jobs', job);
                message.success("Job created successfully");
            } catch (error: any) {
                message.error("Error while creating job: " + (error.response?.data?.message || error.message));
            } finally {
                setLoading(false);
            }
        } catch (error) {
            // Validation failed
            console.error('Validation failed:', error);
        }
    };

    return (
        <Spin spinning={loading}>
            <div style={{ display: "flex", marginBottom: '20px' }}>
                <Link to='/admin/jobs'> <Button icon={<ArrowLeftOutlined />} type="primary">
                    back
                </Button></Link>
            </div>
            <Card title={<div style={{ fontSize: '28px' }}>Create a New Job</div>} style={{ width: '100%' }}>
                <Form form={form} layout="vertical" onFinish={handleSubmit} onFinishFailed={(err) => console.log(err)} >
                    <Form.Item label="Job Title" name={"title"} rules={[{ required: true, message: 'Please input Job Title!' }]}>
                        <Input onChange={(e) => handleInputChange(e.target.value, "title")} />
                    </Form.Item>

                    <Form.Item label="Job Description" name={"description"} rules={[{ required: true, message: 'Please input Description!' }]}>
                        <Input.TextArea onChange={(e) => handleInputChange(e.target.value, "description")} />
                    </Form.Item>

                    <Form.Item label="Short Description" name={"shortDes"} rules={[{ required: true, message: 'Please input short Description!' }]}>
                        <Input.TextArea onChange={(e) => handleInputChange(e.target.value, "shortDes")} />
                    </Form.Item>

                    <Form.Item label="Skills" name={"skills"} rules={[{ required: true, message: 'Please input atleast 1 skill!' }]}>
                        <Select mode="tags" onChange={(value) => handleSelectChange('skills', value)} />
                    </Form.Item>

                    <Form.Item label="Company" name={"company"} rules={[{ required: true, message: 'Please input Company name!' }]}>
                        <Input onChange={(e) => handleInputChange(e.target.value, "company")} />
                    </Form.Item>

                    <Form.Item label="Sector" name={"field"} rules={[{ required: true, message: 'Please input Sector!' }]}>
                        <Input onChange={(e) => handleInputChange(e.target.value, "field")} />
                    </Form.Item>

                    <Form.Item label="Years of Experience Required" name={"yearsExp"} rules={[{ required: true, message: 'Please input Years of Experience Required!' }]}>
                        <InputNumber style={{ width: '100%' }} onChange={(value) => handleInputChange(value || 0, "yearsExp")} />
                    </Form.Item>

                    <Form.Item label="Languages" name={"languages"}>
                        <Select mode="tags" onChange={(value) => handleSelectChange('languages', value)} />
                    </Form.Item>

                    <Form.Item label="Certificates" name={"certificates"}>
                        <Select mode="tags" onChange={(value) => handleSelectChange('certificates', value)} />
                    </Form.Item>

                    <Form.Item label="Education Level" name={"educationLevel"}>
                        <Input onChange={(e) => handleInputChange(e.target.value, "educationLevel")} />
                    </Form.Item>

                    <Form.Item label="Skills Weight" name={"skills_weight"} rules={[{ required: true, message: 'Please input Skills Weight!' }, { validator: checkTotalWeight }]}>
                        <InputNumber style={{ width: '100%' }} onChange={(value) => handleInputChange(value || 0, "skills_weight")} />
                    </Form.Item>

                    <Form.Item label="Experience Weight" name={"yearsExp_weight"} rules={[{ required: true, message: 'Please input Experience Weight!' }, { validator: checkTotalWeight }]}>
                        <InputNumber style={{ width: '100%' }} onChange={(value) => handleInputChange(value || 0, "yearsExp_weight")} />
                    </Form.Item>

                    <Form.Item label="Languages Weight" name={"languages_weight"} rules={[{ required: true, message: 'Please input Languages Weight!' }, { validator: checkTotalWeight }]}>
                        <InputNumber style={{ width: '100%' }} onChange={(value) => handleInputChange(value || 0, "languages_weight")} />
                    </Form.Item>

                    <Form.Item label="Job Title Weight" name={"job_title_weight"} rules={[{ required: true, message: 'Please input Job weight!' }, { validator: checkTotalWeight }]}>
                        <InputNumber style={{ width: '100%' }} onChange={(value) => handleInputChange(value || 0, "job_title_weight")} />
                    </Form.Item>

                    <Form.Item label="Education Weight" name={"education_weight"} rules={[{ required: true, message: 'Please input your Education Weight!' }, { validator: checkTotalWeight }]}>
                        <InputNumber style={{ width: '100%' }} onChange={(value) => handleInputChange(value || 0, "education_weight")} />
                    </Form.Item>

                    <Form.Item label="Certificates Weight" name={"certificates_weight"} rules={[{ required: true, message: 'Please input your Certification weight!' }, { validator: checkTotalWeight }]}>
                        <InputNumber style={{ width: '100%' }} onChange={(value) => handleInputChange(value || 0, "certificates_weight")} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" style={{ width: '100%' }} htmlType="submit" icon={<PlusOutlined />}>
                            Create Job
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Spin>

    );
};

export default CreateJobForm;