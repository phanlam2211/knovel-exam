import { Input, Row } from 'antd';
import { FormItem } from '../../../components/form/form-item';
import React from 'react';
import styled from 'styled-components';
import { useEmployeesStore } from '../store';
import { FORM_MODE } from '../../../constants/common';

export const EmployeeForm = () => {
  const { employeeForm } = useEmployeesStore((state) => state.employeeFormState);
  const isCreate = employeeForm.type === FORM_MODE.CREATE;

  return (
    <React.Fragment>
      <Row>
        <FormItem span={24} label='Name' element={<StyledInput placeholder='Enter employee name' autoComplete='off' />} required name='name' />

        <FormItem span={24} label='Email' element={<StyledInput placeholder='Enter email address' autoComplete='off' />} required name='email' />

        {isCreate && (
          <FormItem
            span={24}
            label='Password'
            element={<StyledPasswordInput placeholder='Enter password' autoComplete='new-password' />}
            required
            name='password'
          />
        )}
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

const StyledPasswordInput = styled(Input.Password)`
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

  .ant-input {
    border: none;
    background: transparent;
    height: 100%;
    padding: 0;
    font-size: 14px;
  }

  .ant-input-suffix {
    margin-right: 0;
  }
`;