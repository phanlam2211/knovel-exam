import { useEffect } from 'react';
import { useEmployeesStore } from '../store';
import { User, usersService } from '../../../swagger-api';
import { Formatter } from '../../../helpers';
import { FORM_MODE } from '../../../constants/common';
import type { ColumnsType } from 'antd/es/table';
import { Button, Modal, Space, Tag } from 'antd';
import { useGetCurrentUser } from '../../../hooks/use-get-current-user';

const { confirm } = Modal;

export const useFetchEmployees = () => {
  const { isEmployyer } = useGetCurrentUser();

  const { setEmployeeForm } = useEmployeesStore((state) => state.employeeFormState);
  const { asyncEmployeesList } = useEmployeesStore((state) => state);
  const { data, loading } = asyncEmployeesList;

  useEffect(() => {
    asyncEmployeesList.execute();
  }, []);

  const handleDelete = (record: User) => {
    confirm({
      title: 'Are you sure you want to delete?',
      content: `Are you sure you want to delete employee: ${record.name || record.email}?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      async onOk() {
        await usersService.usersControllerRemove(record.id);
        await asyncEmployeesList.execute();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleAddEmployee = () => {
    setEmployeeForm({
      open: true,
      type: FORM_MODE.CREATE,
      employee: null,
    });
  };

  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text || 'N/A'}</strong>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => <div>{email}</div>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color='green'>{role.name}</Tag>,
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => <div>{Formatter.date(createdAt)}</div>,
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
              setEmployeeForm({
                type: FORM_MODE.EDIT,
                employee: { ...record },
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

  return { data, loading, columns, handleAddEmployee };
};