import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Modal, notification } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import UserInfoForm from '../../../components/UserInfoForm';
import api from '../../../api/api';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const UserInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    gender: '',
    date_of_birth: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 从本地存储获取 token
        const token = localStorage.getItem('token');
        
        if (!token) {
          // 如果没有 token，重定向到登录页面
          navigate('/login');
          return;
        }
        
        // 发起请求并带上 token
        const response = await api.post('/user/get', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // 处理响应数据
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        notification.error({
          message: '获取用户信息失败',
          description: '请重新登录或检查网络连接。',
        });
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async () => {
    try {
      const response = await api.post('/user/get');
      setUserInfo(response.data);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const genderText = userInfo.gender === '1' ? '男' : userInfo.gender === '0' ? '女' : '';

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Card
        title={<Title level={3}>用户信息</Title>}
        extra={<Button type="primary" onClick={handleEditClick}>编辑</Button>}
        style={{ width: '100%' }}
      >
        <Paragraph>
          <UserOutlined style={{ marginRight: '8px' }} />
          <strong>名字:</strong> {userInfo.name}
        </Paragraph>
        <Paragraph>
          <UserOutlined style={{ marginRight: '8px' }} />
          <strong>性别:</strong> {genderText}
        </Paragraph>
      </Card>

      {/* 编辑表单的模态窗口 */}
      <Modal
        title="编辑个人信息"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <UserInfoForm
          initialValues={userInfo}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default UserInfo;
