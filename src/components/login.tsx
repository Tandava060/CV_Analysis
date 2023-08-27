import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const navigate = useNavigate();

    const onFinish = async (values: { username: string, password: string }) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/login`, values);
            if (response.status === 200) {
                localStorage.setItem('token', response.data);
                message.success("Login Successful");
                navigate("/admin/jobs")
            }
        } catch (error) {
            message.error("Wrong credentials, please enter correct username and password");
        }
    };



    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "70vh" }}>
            <Card title="Login" style={{ width: 300, textAlign: 'center' }}>
                <Form name="login-form" onFinish={onFinish}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please enter your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                            Log In
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginForm;