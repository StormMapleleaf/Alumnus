import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Modal, notification } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import UserInfoForm from '../../../components/UserInfoForm';
import UserVerify from '../../../components/UserVerify';
import UserSearch from '../../../components/UserSearch';
import api from '../../../api/api';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const UserInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    gender: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false); // 控制 UserVerify 模态框的可见性
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

  // 编辑个人信息的逻辑
  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  // 打开用户认证模态框的逻辑
  const handleVerifyClick = () => {
    setIsVerifyModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleVerifyCancel = () => {
    setIsVerifyModalVisible(false);
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

  const handleVerifySubmit = () => {
    // 刷新用户信息或者其他逻辑
    setIsVerifyModalVisible(false);
  };

  const genderText = userInfo.gender === '1' ? '男' : userInfo.gender === '0' ? '女' : '';

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Card
        title={<Title level={3}>用户信息</Title>}
        extra={
          <>
            <Button type="primary" onClick={handleEditClick} style={{ marginRight: '10px' }}>
              编辑
            </Button>
            <Button type="default" onClick={handleVerifyClick}>
              身份认证
            </Button>
          </>
        }
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

      {/* 用户搜索功能 */}
      <div style={{ width: '700px' ,marginTop: '20px' }}>
        <Card title="用户搜索">
          <UserSearch /> {/* 嵌入 UserSearch 组件 */}
        </Card>
      </div>

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

      {/* 用户认证的模态窗口 */}
      <Modal
        title="用户认证"
        visible={isVerifyModalVisible}
        footer={null}
        onCancel={handleVerifyCancel}
      >
        <UserVerify
          initialValues={{
            enrollment_status: '', // 例如：本科生、研究生、博士生等
            school: '',
            faculty: '',
            student_id: '',
            major: '',
            class: '',
          }}
          isVisible={isModalVisible}
          onSubmit={handleVerifySubmit}
          onCancel={handleVerifyCancel}
        />
      </Modal>
    </div>
  );
};

export default UserInfo;
