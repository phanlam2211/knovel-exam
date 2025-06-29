import { Button, Card, Col, Row, Spin, Table, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import { AppLayout } from '../layout/layout-private';
import { useFetchEmployees } from './hooks/use-fetch-employees';
import { EmployeeModal } from './employee-modal';

const { Title } = Typography;

export const ManageEmployeesContainer = () => {
  const { data, loading, columns, handleAddEmployee } = useFetchEmployees();

  return (
    <AppLayout>
      <Spin spinning={loading} />
      <ManageEmployeesWrapper>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <HeaderSection>
              <Title level={2}>Manage Employees</Title>

              <Button type='primary' icon={<PlusOutlined />} onClick={handleAddEmployee}>
                Add Employee
              </Button>
            </HeaderSection>
          </Col>

          <Col span={24}>
            <Card>
              <Table columns={columns} dataSource={data} rowKey='id' />
            </Card>
          </Col>
        </Row>
        <EmployeeModal />
      </ManageEmployeesWrapper>
    </AppLayout>
  );
};

const ManageEmployeesWrapper = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;