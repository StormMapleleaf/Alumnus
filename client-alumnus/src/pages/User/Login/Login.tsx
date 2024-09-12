// src/pages/Login.tsx

import React, { useState } from 'react';
import { Form, Input, Button, Alert, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api'; 
import 'antd/dist/reset.css'; 
import RegisterForm from '../../../components/RegisterForm';

const { Title } = Typography;

const Login: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [isRegisterVisible, setIsRegisterVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (values: { phone_number: string; password: string }) => {
        try {
            const response = await api.post('/login', {
                phone_number: values.phone_number,
                password: values.password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log(token);
            
            setMessage('登录成功');
            navigate('/home'); // 跳转到主页或其他你想跳转的页面

        } catch (error) {
            setMessage('登录失败');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>登录</Title>
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                style={{ padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
            >
                <Form.Item
                    name="phone_number"
                    rules={[{ required: true, message: '请输入您的手机号!' }]}
                >
                    <Input placeholder="手机号" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入您的密码!' }]}
                >
                    <Input.Password placeholder="密码" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        登录
                    </Button>
                </Form.Item>

                {message && (
                    <Form.Item>
                        <Alert message={message} type={message === '登录成功' ? 'success' : 'error'} showIcon />
                    </Form.Item>
                )}

                <Form.Item>
                    <Button type="default" onClick={() => setIsRegisterVisible(true)} block>
                        注册
                    </Button>
                </Form.Item>

            </Form>

            {/* 注册表单的模态窗口 */}
            <RegisterForm
                visible={isRegisterVisible}
                onCancel={() => setIsRegisterVisible(false)}
            />
        </div>
    );
};

export default Login;
