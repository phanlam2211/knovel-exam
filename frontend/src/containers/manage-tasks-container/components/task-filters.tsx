import React, { useMemo } from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { useTasksStore } from '../store';
import { CommonSelectQuery } from '../../../components/select/select-query';
import { FilterOutlined, UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const STATUS_OPTIONS = [
  { value: '1', label: 'Pending' },
  { value: '2', label: 'In Progress' },
  { value: '3', label: 'Completed' },
  { value: '4', label: 'Cancelled' },
];

export const TaskFilters = () => {
  const { data: employeeList } = useTasksStore((state) => state.asyncGetAllEmployee);

  const employeeOptions = useMemo(() => {
    return employeeList.map((item) => ({
      value: String(item.id),
      label: (
        <span>
          <UserOutlined style={{ marginRight: 6 }} />
          {item.email}
        </span>
      ),
    }));
  }, [employeeList]);

  return (
    <Card
      style={{
        marginBottom: 24,
        background: '#fafcff',
        border: '1px solid #e6f7ff',
        borderRadius: 8,
      }}
      bodyStyle={{ padding: 16 }}
    >
      <Row gutter={24} align='middle'>
        <Col>
          <Text strong style={{ marginRight: 10 }}>
            <FilterOutlined style={{ marginRight: 6, color: '#1890ff' }} />
            Filter by Assignee
          </Text>
          <CommonSelectQuery
            placeholder='Select assignee'
            style={{ width: 200, marginTop: 4 }}
            allowClear
            queryName={'assigneeId'}
            options={employeeOptions}
          />
        </Col>
        <Col>
          <Text strong style={{ marginRight: 10 }}>
            <FilterOutlined style={{ marginRight: 6, color: '#1890ff' }} />
            Filter by Status
          </Text>
          <CommonSelectQuery
            placeholder='Select status'
            style={{ width: 200, marginTop: 4 }}
            queryName={'statusId'}
            allowClear
            options={STATUS_OPTIONS}
          />
        </Col>
      </Row>
    </Card>
  );
};