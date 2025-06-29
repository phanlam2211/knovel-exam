import { Card, Col, Row, Spin, Typography } from 'antd';
import styled from 'styled-components';
import { AppLayout } from '../layout/layout-private';
import { useFetchEmployeeTasks } from './hooks/use-fetch-employee-tasks';
import { BaseTable } from '../../components';

const { Title } = Typography;

export const EmployeeTaskSummaryContainer = () => {
  const { data, loading, columns } = useFetchEmployeeTasks();

  return (
    <AppLayout>
      <Spin spinning={loading} >
        <EmployeeTaskSummaryWrapper>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <HeaderSection>
                <Title level={2}>Employee Task Summary</Title>
              </HeaderSection>
            </Col>

            <Col span={24}>
              <Card>
                <BaseTable columns={columns} dataSource={data.data} rowKey='userId' total={data.total} pagination={false} />
              </Card>
            </Col>
          </Row>
        </EmployeeTaskSummaryWrapper>
      </Spin>
    </AppLayout>
  );
};

const EmployeeTaskSummaryWrapper = styled.div`
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