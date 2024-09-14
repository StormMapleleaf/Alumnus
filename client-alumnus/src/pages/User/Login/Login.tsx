import React, { useState } from 'react';
import { Form, Input, Button, Alert, Typography, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import 'antd/dist/reset.css';
import RegisterForm from '../../../components/RegisterForm';
import RealHumanVerification from '../../../components/RealHumanVerification';

const { Title } = Typography;

const Login: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [isRegisterVisible, setIsRegisterVisible] = useState<boolean>(false);
  const [isVerificationVisible, setIsVerificationVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (values: { phone_number: string; password: string }) => {
    setIsVerificationVisible(true); // Show human verification when login is clicked
    // Store form values in state for later use
    localStorage.setItem('loginValues', JSON.stringify(values));
  };

  const handleVerifySuccess = async () => {
    setIsVerificationVisible(false);
    const values = JSON.parse(localStorage.getItem('loginValues') || '{}');
    try {
      const response = await api.post('/login', {
        phone_number: values.phone_number,
        password: values.password,
      });
      const user_id = response.data.user_id;
      localStorage.setItem('token', user_id);
      setMessage('登录成功');
      navigate('/user'); // Redirect to user page or other page
    } catch (error) {
      setMessage('登录失败');
    }
  };

  const handleVerificationCancel = () => {
    setIsVerificationVisible(false);
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

      {/* 真人验证的模态窗口 */}
      <Modal
        title="真人验证"
        visible={isVerificationVisible}
        footer={null}
        onCancel={handleVerificationCancel}
      >
        <RealHumanVerification
          onVerifySuccess={handleVerifySuccess}
          onCancel={handleVerificationCancel}
        />
      </Modal>
    </div>
  );
};

export default Login;
