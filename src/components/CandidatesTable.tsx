import { useEffect, useState } from 'react';
import { Button, Table, Modal, Descriptions, Divider, Tooltip as Tool, Space } from 'antd';
import { Tooltip, Legend, Cell, Pie, PieChart } from 'recharts';
import { Document, Page } from 'react-pdf';
import axios from 'axios'; import { pdfjs } from 'react-pdf'; import { Tabs } from 'antd';
import { EyeOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';


const { TabPane } = Tabs;

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface UICandidate {
    id: string,
    name: string,
    resume: string,
    skills: string[],
    years_exp: number,
    languages: string[],
    certifications: string[],
    educations: string[],
    positions: string[],
    email: string,
    linkedin: string,
    phone: string,
    skills_weight: number,
    yearsExp_weight: number,
    languages_weight: number,
    positions_weight: number,
    education_weight: number,
    certificates_weight: number,
    total_score: number,
    job_id: string
}

export default function Candidates() {
    const [candidates, setCandidates] = useState<UICandidate[]>([]);
    const [selectedCandidate, setSelectedCandidate] = useState<UICandidate | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isPdfModalVisible, setPdfIsModalVisible] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pdfData, setPdfData] = useState<Uint8Array>();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/job/${id}/resumes`);
            setCandidates(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const weights = selectedCandidate ? [
        { name: 'Skills', value: selectedCandidate.skills_weight },
        { name: 'Experience', value: selectedCandidate.yearsExp_weight },
        { name: 'Languages', value: selectedCandidate.languages_weight },
        { name: 'Positions', value: selectedCandidate.positions_weight },
        { name: 'Education', value: selectedCandidate.education_weight },
        { name: 'Certifications', value: selectedCandidate.certificates_weight },
    ] : [];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF416C'];

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Total Score', dataIndex: 'total_score', key: 'total_score' },
        {
            title: 'Action', key: 'action',
            render: (_: any, record: UICandidate) => (
                <Space size="middle">
                    <Tool title="View Structured Details">
                        <Button shape="circle" icon={<EyeOutlined />} onClick={() => { setSelectedCandidate(record); setIsModalVisible(true); }} />
                    </Tool>

                    <Tool title="View pdf">
                        <Button shape="circle" icon={<FilePdfOutlined />} onClick={() => {
                            console.log(record.resume)
                            const binary_string = window.atob(record.resume);
                            const len = binary_string.length;
                            const bytes = new Uint8Array(len);
                            for (let i = 0; i < len; i++) {
                                bytes[i] = binary_string.charCodeAt(i);
                            }
                            setPdfData(bytes);
                            setPdfIsModalVisible(true)
                        }} />
                    </Tool>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Passed Candidates" key="1">
                    <Table pagination={{ pageSize: 10, position: ['bottomCenter'] }} dataSource={candidates.filter(candidate => candidate.total_score >= 70)} columns={columns} rowKey="id" />
                </TabPane>
                <TabPane tab="All Candidates" key="2">
                    <Table pagination={{ pageSize: 10, position: ['bottomCenter'] }} dataSource={candidates} columns={columns} rowKey="id" />
                </TabPane>

                <TabPane tab="Rejected Candidates" key="3">
                    <Table pagination={{ pageSize: 10, position: ['bottomCenter'] }} dataSource={candidates.filter(candidate => candidate.total_score < 70)} columns={columns} rowKey="id" />
                </TabPane>
            </Tabs>

            <Modal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                width={800}
                footer={null}
            >
                {selectedCandidate && (
                    <>
                        <h2>{selectedCandidate.name}</h2>

                        <Descriptions column={1}>
                            <Descriptions.Item label="Email">{selectedCandidate.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{selectedCandidate.phone}</Descriptions.Item>
                            <Descriptions.Item label="LinkedIn">{selectedCandidate.linkedin}</Descriptions.Item>
                            <Descriptions.Item label="Skills">{selectedCandidate.skills.join(', ')}</Descriptions.Item>
                            <Descriptions.Item label="Languages">{selectedCandidate.languages.join(', ')}</Descriptions.Item>
                            <Descriptions.Item label="Certifications">{selectedCandidate.certifications.join(', ')}</Descriptions.Item>
                            <Descriptions.Item label="Educations">{selectedCandidate.educations.join(', ')}</Descriptions.Item>
                            <Descriptions.Item label="Positions">{selectedCandidate.positions.join(', ')}</Descriptions.Item>
                        </Descriptions>

                        <Divider />
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <PieChart width={600} height={400} >
                                <Pie
                                    data={weights}
                                    cx={250}
                                    cy={150}
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                                    outerRadius={70}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {weights.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>

                    </>
                )}
            </Modal>

            <Modal open={isPdfModalVisible} onCancel={() => setPdfIsModalVisible(false)}
                width={650}
                footer={null}>
                <Document file={{ data: pdfData }}>
                    <Page pageNumber={1} />
                </Document>
            </Modal>
        </>
    );
}
