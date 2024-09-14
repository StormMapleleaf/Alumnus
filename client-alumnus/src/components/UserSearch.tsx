import React, { useState } from 'react';
import { Input, Button, Table, notification } from 'antd';
import api from '../api/api';  

const UserSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) {
      notification.error({ message: '请输入搜索关键词' });
      return;
    }
  
    setLoading(true);
    try {
      const response = await api.post('/user/search', { query: searchTerm });  // 使用 api.post 发起请求
      
      // 假设 response.data 是 JSON 对象，需要提取其中的 data 字段
      const { data } = response.data;
  
      // 确保提取到的数据是数组
      if (Array.isArray(data)) {
        setData(data);  // 设置到表格中
        notification.success({ message: '搜索成功' });
      } else {
        setData([]);  // 防止数据不是数组，设置为空数组
        notification.error({ message: '搜索结果格式不正确' });
      }
    } catch (error) {
      notification.error({ message: '搜索失败' });
    } finally {
      setLoading(false);
    }
  };
  
  const columns = [ 
    // {
    //   title: '用户ID',
    //   dataIndex: 'user_id',
    //   key: 'user_id',
    // },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (dataIndex: number) => (dataIndex == 1 ? '男' : '女'),
    },
    {
      title: '学校',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: '学历',
      dataIndex: 'enrollment_status',
      key: 'enrollment_status',
    },
    {
      title: '学院',
      dataIndex: 'faculty',
      key: 'faculty',
    },
    {
      title: '专业',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: '班级',
      dataIndex: 'class',
      key: 'class',
    },
  ];


  return (
    <div>
      <Input
        placeholder="请输入用户名"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: 300, marginRight: 10 }}
      />
      <Button type="primary" onClick={handleSearch} loading={loading}>
        搜索
      </Button>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="user_id"
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default UserSearch;
