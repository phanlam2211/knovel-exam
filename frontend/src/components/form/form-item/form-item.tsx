import styled from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';
import { Col, Typography } from 'antd';
import type { ReactNode } from 'react';
import { cloneElement, type PropsWithChildren } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { LabelRequired } from '../form-styles';

const { Text } = Typography;
export type FormItemProps = {
  label?: ReactNode;
  required?: boolean;
  name: string;
  element: any;
  isEdit?: boolean;
  span?: number;
  style?: React.CSSProperties;
};

export const FormItem = ({ label, name, element, isEdit = true, span, required, style }: PropsWithChildren<FormItemProps>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <ColWrapper span={span} className='form-item' style={style}>
      {label && (
        <Typography>
          {label}
          {required && <LabelRequired>*</LabelRequired>}
        </Typography>
      )}
      <Controller
        control={control}
        render={({ field, fieldState: { error } }) => {
          return cloneElement(element, {
            ...field,
            className: error ? 'error' : '',
            disabled: !isEdit,
          });
        }}
        name={name}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <ErrorText type='danger' style={{ display: 'block', marginTop: '4px' }}>
            {message}
          </ErrorText>
        )}
      />
    </ColWrapper>
  );
};

const ColWrapper = styled(Col)`
  padding: 16px;
  .label {
    font-size: 14px;
    font-weight: 400;
  }
  input {
    border-radius: 6px;
  }
`;

const ErrorText = styled(Text)`
  font-size: 12px;
`;
