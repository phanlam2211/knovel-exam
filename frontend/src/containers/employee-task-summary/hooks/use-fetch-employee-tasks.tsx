import { useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Progress, Tag } from 'antd';
import { useEmployeeTaskSummaryStore } from '../store';
import { TaskSummary } from '../../../swagger-api/gen/data-contracts';
import useQueryParams from '../../../components/use-query-params';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../../../constants';

export const useFetchEmployeeTasks = () => {
  const { asyncEmployeeTaskSummary } = useEmployeeTaskSummaryStore((state) => state);
  const { data, loading } = asyncEmployeeTaskSummary;
  const params = useQueryParams();

  const { page, size } = params.getQueryParams();

  useEffect(() => {
    asyncEmployeeTaskSummary.execute({ page: page ?? DEFAULT_PAGE_NUMBER, size: size ?? DEFAULT_PAGE_SIZE });
  }, [page, size]);

  const columns: ColumnsType<TaskSummary> = [
    {
      title: 'Employee Name',
      dataIndex: 'userName',
      key: 'userName',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Total Tasks',
      dataIndex: 'totalTasks',
      key: 'totalTasks',
      render: (totalTasks) => (
        <Tag color='blue' style={{ fontSize: '14px', padding: '4px 8px' }}>
          {totalTasks}
        </Tag>
      ),
    },
    {
      title: 'Completed Tasks',
      dataIndex: 'completedTasks',
      key: 'completedTasks',
      render: (completedTasks) => (
        <Tag color='green' style={{ fontSize: '14px', padding: '4px 8px' }}>
          {completedTasks}
        </Tag>
      ),
    },
    {
      title: 'Completion Rate',
      key: 'completionRate',
      render: (_, record) => {
        const percentage = record.totalTasks > 0 ? Math.round((record.completedTasks / record.totalTasks) * 100) : 0;

        return <Progress percent={percentage} size='small' status={percentage === 100 ? 'success' : 'active'} format={(percent) => `${percent}%`} />;
      },
    },
    {
      title: 'Pending Tasks',
      key: 'pendingTasks',
      render: (_, record) => {
        const pendingTasks = record.totalTasks - record.completedTasks;
        return (
          <Tag color='orange' style={{ fontSize: '14px', padding: '4px 8px' }}>
            {pendingTasks}
          </Tag>
        );
      },
    },
  ];

  return { data, loading, columns };
};