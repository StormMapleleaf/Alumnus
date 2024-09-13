import React from 'react';
import { Modal, Form, Input, Button, DatePicker, Radio, notification } from 'antd';
import { UserOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';
import api from '../api/api'; 

interface UserInfoFormProps {
  initialValues: {
    name: string;
    gender: string;
  };
  onSubmit: () => void;
  onCancel: () => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      // 从本地存储获取 token
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No token found');
      }

      // 发送请求并带上 token
      const response = await api.post('/user/update', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      notification.success({
        message: '信息更新成功',
        description: response.data.message,
      });
      form.resetFields();
      onSubmit();  // Notify parent to refresh user info
      onCancel();  // Close the modal after successful update
    } catch (error: any) {
      notification.error({
        message: '更新失败',
        description: error.response?.data.message || 'An error occurred',
      });
    }
  };

  return (
    <Form
      form={form}
      name="userInfoForm"
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={{
        name: initialValues.name,
        gender: initialValues.gender,
      }}
    >
      <Form.Item
        name="name"
        label="名字"
        rules={[{ required: true, message: '请输入您的名字!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="名字" />
      </Form.Item>
      
      <Form.Item
        name="gender"
        label="性别"
        rules={[{ required: true, message: '请选择性别!' }]}
      >
        <Radio.Group>
          <Radio value="0">女</Radio>
          <Radio value="1">男</Radio>
        </Radio.Group>
      </Form.Item>
      
      
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          更新信息
        </Button>
        <Button type="default" onClick={onCancel} block style={{ marginTop: '10px' }}>
          取消
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserInfoForm;
