// src/components/RegisterForm.tsx

import React from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import api from '../api/api'; 

interface RegisterFormProps {
  visible: boolean;
  onCancel: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: { phone_number: string; password: string }) => {
    try {
      const response = await api.post('/register', values);
      notification.success({
        message: '注册成功',
        description: response.data.message,
      });
      form.resetFields();
      onCancel();  // Close the modal after successful registration
    } catch (error: any) {
      notification.error({
        message: '注册失败',
        description: error.response?.data.message || 'An error occurred',
      });
    }
  };

  return (
    <Modal
      visible={visible}
      title="注册"
      okText="注册"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="phone_number"
          label="手机号"
          rules={[{ required: true, message: '请输入手机号!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterForm;
