import { Input, Row } from 'antd';
import { FormItem } from '../../../components/form/form-item';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { CommonSelect } from '../../../components/select/common-select';
import { useTasksStore } from '../store';
import { DatePickerForm } from '../../../components/date-picker/date-picker-form';
import { Format } from '../../../helpers';
import { useGetCurrentUser } from '../../../hooks/use-get-current-user';
import { FORM_MODE, STATUS_OPTIONS } from '../../../constants/common';

export const TaskForm = () => {
  const { data } = useTasksStore((state) => state.asyncGetAllEmployee);
  const { isEmployyer } = useGetCurrentUser();
  const { taskForm } = useTasksStore((state) => state.taskFormState);
  const isCreate = taskForm.type === FORM_MODE.CREATE;
  const employeeOptions = useMemo(() => {
    return data.map((item) => ({
      value: item.id,
      label: item.email,
    }));
  }, [data]);
  return (
    <React.Fragment>
      <Row>
        <FormItem
          isEdit={isEmployyer}
          span={12}
          label='Title'
          element={<StyledInput placeholder='Enter task title' autoComplete='off' />}
          required
          name='title'
        />
        <FormItem
          span={12}
          label='Assignee'
          isEdit={isEmployyer}
          required
          element={<StyledSelect options={employeeOptions} placeholder='Enter assignee name' />}
          name='assigneeId'
        />

        {!isCreate && (
          <FormItem
            label='Status'
            span={12}
            required
            element={<StyledSelect options={STATUS_OPTIONS} placeholder='Select status' />}
            name='statusId'
          />
        )}

        <FormItem span={12} isEdit={isEmployyer} label='Due Date' required element={<StyledDatePicker format={Format.date} />} name='dueDate' />

        <FormItem
          isEdit={isEmployyer}
          span={12}
          label='Description'
          element={<StyledTextArea rows={4} placeholder='Enter detailed task description' autoComplete='off' />}
          name='description'
        />
      </Row>
    </React.Fragment>
  );
};

const StyledInput = styled(Input)`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  padding: 0 11px;
  font-size: 14px;

  &:focus {
    border-color: #1890ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const StyledDatePicker = styled(DatePickerForm)`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  padding: 0 11px;
  font-size: 14px;

  &:focus {
    border-color: #1890ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const StyledSelect = styled(CommonSelect)`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &:focus {
    border-color: #1890ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  padding: 11px;
  font-size: 14px;
  resize: vertical;

  &:focus {
    border-color: #1890ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;
