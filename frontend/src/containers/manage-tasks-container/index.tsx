import { Button, Card, Col, Row, Spin, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import { AppLayout } from '../layout/layout-private';
import { useFetchTasks } from './hooks/use-fetch-tasks';
import { TaskModal } from './task-modal';
import { BaseTable } from '../../components';
import { TaskFilters } from './components/task-filters';
import { useGetCurrentUser } from '../../hooks/use-get-current-user';

const { Title } = Typography;

export const ManageTasksContainer = () => {
  const { data, loading, columns, handleAddTask } = useFetchTasks();
  const { isEmployyer } = useGetCurrentUser();

  return (
    <AppLayout>
      <Spin spinning={loading} />
      <ManageTasksContainerWrapper>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <HeaderSection>
              <Title level={2}>Manage Tasks</Title>

              {isEmployyer && (
                <Button type='primary' icon={<PlusOutlined />} onClick={handleAddTask}>
                  Add Task
                </Button>
              )}
            </HeaderSection>
          </Col>
          <TaskFilters />

          <Col span={24}>
            <Card>
              <BaseTable columns={columns} dataSource={data.data} rowKey='id' total={data.total} />
            </Card>
          </Col>
        </Row>
        <TaskModal />
      </ManageTasksContainerWrapper>
    </AppLayout>
  );
};

const ManageTasksContainerWrapper = styled.div`
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
