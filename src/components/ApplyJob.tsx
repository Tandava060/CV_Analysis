import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Upload, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { useForm } = Form;

export const ApplyJob: React.FC<{ jobId: string, jobTitle: string, visible: boolean, setdata: React.Dispatch<React.SetStateAction<boolean>> }> = ({ jobId, jobTitle, visible, setdata }) => {
  const [isModalVisible, setIsModalVisible] = useState(visible);
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  useEffect(() => {
    setIsModalVisible(visible);
  }, [visible]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('yearsExp', values.experience);
      formData.append('file', values.resume.file);  
      setLoading(true)

      const response = await axios.post(`http://127.0.0.1:8000/job/${jobId}/resumes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if(response.status === 200){
        message.success("Application submitted successfully");
      }

      setIsModalVisible(false);
      setdata(false);
      setLoading(false)
    } catch (error) {
      message.error("An Error has occured! please try again later.");
      setLoading(false)
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setdata(false);
  };

  const props = {
    beforeUpload: (file: File) => {
      if (file.type !== 'application/pdf') {
        message.error(`${file.name} is not a pdf file`);
      }
      return false;
    },
    maxCount: 1
  };

  return (
    <div>
      <Modal  closable={!loading} maskClosable={false} title={<div style={{ textAlign: 'center', fontSize: "1.3rem", marginBottom: "1.5rem", width: "90%" }}>Apply for {jobTitle} Position</div>} okButtonProps={{ disabled: loading }} cancelButtonProps={{ disabled: loading }} open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        
    <Spin spinning={loading}>
        <Form form={form} name="jobApplication">
          <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="experience" rules={[{ required: true, message: 'Please input your years of experience!' }]}>
            <Input placeholder="Years of Experience" type="number" />
          </Form.Item>
          <Form.Item name="resume" valuePropName="file" rules={[{ required: true, message: 'Please upload your resume!' }]}>
            <Upload listType='picture' accept='application/pdf' {...props}>
              <Button icon={<UploadOutlined />}>Upload PDF</Button>
            </Upload>
          </Form.Item>
        </Form>
        </Spin>
      </Modal>
    </div>

  );
};