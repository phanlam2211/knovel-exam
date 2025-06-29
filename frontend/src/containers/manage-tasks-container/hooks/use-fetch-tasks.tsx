import { useEffect } from 'react';
import { useTasksStore } from '../store';
import { Status, Task, taskService } from '../../../swagger-api';
import { Formatter } from '../../../helpers';
import { FORM_MODE, STATUS_TASK } from '../../../constants/common';
import type { ColumnsType } from 'antd/es/table';
import { Button, Modal, Space, Tag } from 'antd';
import useQueryParams from '../../../components/use-query-params';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../../../constants';
import { useGetCurrentUser } from '../../../hooks/use-get-current-user';

const { confirm } = Modal;

export const useFetchTasks = () => {
  const { isEmployyer } = useGetCurrentUser();

  const { setTaskForm } = useTasksStore((state) => state.taskFormState);
  const { asyncTasksList, asyncGetAllEmployee } = useTasksStore((state) => state);
  const { data, loading } = asyncTasksList;
  const params = useQueryParams();
  const { page: pageNumber, size: sizeNumber, assigneeId, statusId, sortBy, sortOrder } = params.getQueryParams();
  const page = pageNumber ?? DEFAULT_PAGE_NUMBER;
  const size = sizeNumber ?? DEFAULT_PAGE_SIZE;
  useEffect(() => {
    asyncGetAllEmployee.execute();
  }, []);

  useEffect(() => {
    if (page && size) {
      asyncTasksList.execute({
        page,
        size,
        assigneeId,
        statusId,
        sortOrder,
        sortBy,
      });
    }
  }, [page, size, assigneeId, statusId, sortOrder, sortBy]);
  const handleDelete = (record: Task) => {
    confirm({
      title: 'Are you sure you want to delete?',
      content: `Are you sure you want to delete the record with ID: ${record?.id}?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      async onOk() {
        await taskService.tasksControllerRemove(String(record.id));
        await asyncTasksList.execute();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleAddTask = () => {
    setTaskForm({
      open: true,
      type: FORM_MODE.CREATE,
      task: null,
    });
  };

  const getStatusColor = (status: Status) => {
    console.log('status', status);
    switch (status.name) {
      case STATUS_TASK.TODO:
        return 'yellow';
      case STATUS_TASK.PENDING:
        return 'orange';
      case STATUS_TASK.INPROGRESS:
        return 'blue';
      case STATUS_TASK.COMPLETED:
        return 'green';
      case STATUS_TASK.CANCELLED:
        return 'red';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<Task> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getStatusColor(status)}>{status.name}</Tag>,
    },
    {
      title: 'Assignee',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (assignee) => <div>{assignee?.email}</div>,
    },
    {
      title: 'Due date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: true,
      render: (dueDate) => <div>{Formatter.date(dueDate)} </div>,
    },

    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => <div>{Formatter.date(createdAt)} </div>,
      sorter: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='link'
            size='small'
            onClick={() => {
              console.log('RECORD', record);

              setTaskForm({
                type: FORM_MODE.EDIT,
                task: { ...record },
                open: true,
              });
            }}
          >
            Edit
          </Button>
          {isEmployyer && (
            <Button type='link' size='small' danger onClick={() => handleDelete(record)}>
              Delete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return { data, loading, columns, handleAddTask };
};
