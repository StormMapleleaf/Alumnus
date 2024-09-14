import React, { useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Select, notification } from 'antd';
import { getVerifyList, updateVerificationStatus } from './service';

const { Option } = Select;
const statusMap: { [key: number]: string } = {
    0: '待审批',
    1: '已通过',
    2: '未通过',
};

const Verify: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  // 获取数据
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getVerifyList();
      setData(response.data); // 更新状态
      return {
        data: response.data,
        success: true,
        total: response.total,
      };
    } catch (error) {
      notification.error({ message: '获取数据失败' });
      return { data: [], success: false, total: 0 };
    } finally {
      setLoading(false);
    }
  };

  // 处理状态变更
  const handleStatusChange = async (id:number, user_id: string, status: number) => {
    try {
      await updateVerificationStatus(id,user_id, status);
      notification.success({ message: '状态更新成功' });
      // 重新请求数据
      await fetchData(); // 确保数据刷新
    } catch (error) {
      notification.error({ message: '状态更新失败' });
    }
  };

  // 表格列定义
  const columns = [
    {
      title:'ID',
      dataIndex:'id',
      key:'id',
    },
    {
      title: '用户ID',
      dataIndex: 'user_id',
      key: 'user_id',
      search: false,
    },
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
      title: '学历',
      dataIndex: 'education_level',
      key: 'education_level',
    },
    {
      title: '学校',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: '学院',
      dataIndex: 'faculty',
      key: 'faculty',
    },
    {
      title: '学号',
      dataIndex: 'student_id',
      key: 'student_id',
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
    {
      title: '申请时间',
      dataIndex: 'apply_time',
      key: 'apply_time',
      valueType: 'dateTime',
    },
    {
      title: '证明图片',
      dataIndex: 'identity_image_path',
      key: 'identity_image_path',
      render: (text: string) => {
        const imageUrl = `http://localhost:8000/storage/${text}`;
        return <img src={imageUrl} alt="证明图片" style={{ width: 100, height: 'auto' }} />;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: number, record: any) => (
        <Select
          value={text}
          onChange={(value) => handleStatusChange(record.id, record.user_id, value)}
        >
          <Option value={0}>{statusMap[0]}</Option>
          <Option value={1}>{statusMap[1]}</Option>
          <Option value={2}>{statusMap[2]}</Option>
        </Select>
      ),
    },
  ];

  return (
    <ProTable
      columns={columns}
      dataSource={data} // 使用 dataSource 确保数据更新
      request={fetchData}  // 确保使用 fetchData 作为请求数据的函数
      rowKey="user_id"
      loading={loading}
      pagination={{
        showQuickJumper: true,
      }}
      search={{
        labelWidth: 'auto',
      }}
      dateFormatter="string"
      toolbar={{
        title: '身份验证审批',
      }}
    />
  );
};

export default Verify;
