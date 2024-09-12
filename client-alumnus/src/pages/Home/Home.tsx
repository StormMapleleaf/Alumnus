// src/pages/Home.tsx

import React from 'react';
import { Typography, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/login'); // Redirect to login page
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Welcome to the Home Page!</Title>
      <Paragraph>
        This is the main page of your application. You can add more components or content here.
      </Paragraph>

      <Card title="User Information" style={{ marginBottom: '20px' }}>
        <Paragraph>
          You can add user-specific information or content here.
        </Paragraph>
      </Card>

      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
