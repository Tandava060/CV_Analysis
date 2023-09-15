import { useEffect, useState } from 'react';
import { Button, Table, Modal, Tooltip as Tool, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios'; import { pdfjs } from 'react-pdf'; import { Tabs } from 'antd';
import { EyeOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { UICandidate } from './UICandidate';
import { CandidateDetails } from './CandidateDetails';


const { TabPane } = Tabs;

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export default function Candidates() {
    const [candidates, setCandidates] = useState<UICandidate[]>([]);
    const [selectedCandidate, setSelectedCandidate] = useState<UICandidate | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isPdfModalVisible, setPdfIsModalVisible] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [mimimumRequiredScore, setMimimumRequiredScore] = useState(0);
    const [pdfData, setPdfData] = useState<any>();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        fetchJobScore();
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/job/${id}/resumes`);
            console.log(response.data)
            setCandidates(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const fetchJobScore = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/jobs/${id}/score`);
            setMimimumRequiredScore(response.data);

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
                            const byteCharacters = atob(record.resume);
                            const byteNumbers = new Array(byteCharacters.length);
                            for (let i = 0; i < byteCharacters.length; i++) {
                                byteNumbers[i] = byteCharacters.charCodeAt(i);
                            }
                            const byteArray = new Uint8Array(byteNumbers);
                            setPdfData(record.resume);
                            setPdfIsModalVisible(true)
                        }} />
                    </Tool>
                </Space>
            ),
        },
    ];

    const filterPassedCandidates = (): UICandidate[] => {
        return candidates.filter(candidate => candidate.total_score >= mimimumRequiredScore).map((candidate, index) => { return { ...candidate, total_score: Number(candidate.total_score.toFixed(2)) } })
            .sort((x, y) => y.total_score - x.total_score)
    }

    const filterRejectedCandidates = (): UICandidate[] => {
        return candidates.filter(candidate => candidate.total_score < mimimumRequiredScore)
            .sort((x, y) => y.total_score - x.total_score)
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Space style={{ marginBottom: 16, display: 'flex' }}>
                    <Link to={"/admin/jobs"}><Button icon={<ArrowLeftOutlined />} type="link" size="large">All Jobs</Button></Link>

                </Space>

                <Space style={{ marginTop: 16, display: 'flex' }}>
                    <Link to={`/admin/jobs/${id}`}><Button type="link" size="large">Job Details</Button></Link>

                </Space>
            </div >


            <Tabs defaultActiveKey="1">
                <TabPane tab="Passed Candidates" key="1">
                    <div style={{ overflowX: 'auto' }}>
                        <Table pagination={{ pageSize: 10, position: ['bottomCenter'] }} dataSource={filterPassedCandidates()} columns={columns} rowKey="id" />
                    </div>
                </TabPane>
                <TabPane tab="All Candidates" key="2">
                    <Table pagination={{ pageSize: 10, position: ['bottomCenter'] }} dataSource={candidates.sort((x, y) => y.total_score - x.total_score)} columns={columns} rowKey="id" />
                </TabPane>

                <TabPane tab="Rejected Candidates" key="3">
                    <Table pagination={{ pageSize: 10, position: ['bottomCenter'] }} dataSource={filterRejectedCandidates()} columns={columns} rowKey="id" />
                </TabPane>
            </Tabs>

            <Modal
                visible={isModalVisible}
                key={selectedCandidate ? selectedCandidate.id : 'empty'}
                onCancel={() => {
                    setIsModalVisible(false)
                    setSelectedCandidate(null)
                }}
                width={800}
                footer={null}
                bodyStyle={{ maxHeight: '600px', overflow: 'auto' }}
                wrapClassName="candidate-details-modal"
            >
                {selectedCandidate && <CandidateDetails selectedCandidate={selectedCandidate} />}
                <style>{`
          .candidate-details-modal .ant-modal-body::-webkit-scrollbar {
            width: 8px;   /* vertical scrollbar width */
            height: 12px;
          }

          .candidate-details-modal .ant-modal-body::-webkit-scrollbar-button {
            height: 100px;
          }
        `}</style>
            </Modal>

            <Modal open={isPdfModalVisible} onCancel={() => setPdfIsModalVisible(false)}
                width={800}

                footer={null}>
                <embed src={`data:application/pdf;base64,${pdfData}`} type="application/pdf" width="750px" height="800px"></embed>
            </Modal>
        </>
    );
}
