import React, { useState } from 'react';
import { Form, Input, Button, Alert, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api'; 
import 'antd/dist/reset.css'; // 导入 Ant Design 样式

const { Title, Link } = Typography;

const Login: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            const response = await api.post('/user/login', {
                email: values.email,
                password: values.password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            
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
                    name="email"
                    rules={[{ required: true, message: '请输入您的邮箱!' }]}
                >
                    <Input placeholder="邮箱" />
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
                    <Link href="http://localhost:8080/oauth/authorize?client_id=9cb0c3b1-b5f3-475a-8a0b-17934bee2d99&redirect_uri=http://localhost:3000/home&response_type=code&scope=*">
                        第三方登录
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
