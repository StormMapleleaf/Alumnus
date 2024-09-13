import React, { useState } from 'react';
import { Modal, Form, Input, Button, Radio, Upload, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../api/api'; 

interface UserVerifyFormProps {
  initialValues: {
    enrollment_status: string;
    school: string;
    faculty: string;
    student_id: string;
    major: string;
    class: string;
  };
  isVisible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const UserVerify: React.FC<UserVerifyFormProps> = ({ initialValues,isVisible, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  const handleSubmit = async (values: any) => {
    try {
      // 从本地存储获取 token
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No token found');
      }

      // 处理上传的图片
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('identity_image', file);
      });

      // 添加表单字段
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });

      // 发送请求并带上 token
      const response = await api.post('/user/verify', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      notification.success({
        message: '信息提交成功',
        description: response.data.message,
      });
      form.resetFields();
      onSubmit();  // 通知父组件刷新用户信息
      onCancel();  // 成功更新后关闭模态框
    } catch (error: any) {
      notification.error({
        message: '提交失败',
        description: error.response?.data.message || 'An error occurred',
      });
    }
  };

  return (
    // <Modal
    //   title="用户认证"
    //   visible={isVisible}
    //   onCancel={onCancel}
    //   footer={null}
    // >
      <Form
        form={form}
        name="userVerifyForm"
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          name="enrollment_status"
          label="学籍"
          rules={[{ required: true, message: '请选择学籍!' }]}
        >
          <Radio.Group>
            <Radio value="本科生">本科生</Radio>
            <Radio value="研究生">研究生</Radio>
            <Radio value="博士生">博士生</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="school"
          label="学校"
          rules={[{ required: true, message: '请输入学校名称!' }]}
        >
          <Input placeholder="请输入学校名称" />
        </Form.Item>

        <Form.Item
          name="faculty"
          label="学院"
          rules={[{ required: true, message: '请输入学院名称!' }]}
        >
          <Input placeholder="请输入学院名称" />
        </Form.Item>

        <Form.Item
          name="student_id"
          label="学号"
          rules={[{ required: true, message: '请输入学号!' }]}
        >
          <Input placeholder="请输入学号" />
        </Form.Item>

        <Form.Item
          name="major"
          label="专业"
          rules={[{ required: true, message: '请输入专业!' }]}
        >
          <Input placeholder="请输入专业" />
        </Form.Item>

        <Form.Item
          name="class"
          label="班级"
          rules={[{ required: true, message: '请输入班级!' }]}
        >
          <Input placeholder="请输入班级" />
        </Form.Item>

        <Form.Item
          label="证明材料"
          rules={[{ required: true, message: '请上传证明材料!' }]}
        >
          <Upload
            beforeUpload={(file) => {
              setFileList([file]);
              return false; // 防止自动上传
            }}
            fileList={fileList}
            onRemove={() => setFileList([])}
          >
            <Button icon={<UploadOutlined />}>上传照片</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            提交认证信息
          </Button>
          <Button type="default" onClick={onCancel} block style={{ marginTop: '10px' }}>
            取消
          </Button>
        </Form.Item>
      </Form>
    // </Modal>
  );
};

export default UserVerify;
