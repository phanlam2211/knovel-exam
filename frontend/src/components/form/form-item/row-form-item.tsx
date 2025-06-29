import styled from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';
import { Col, Row, Typography } from 'antd';
import type { ReactNode } from 'react';
import { cloneElement, type PropsWithChildren } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { ErrorTextStyles, LabelRequired } from '../form-styles';

const { Text } = Typography;
export type FormItemRowProps = {
  label?: ReactNode;
  required?: boolean;
  name: string;
  element: any;
  isEdit?: boolean;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
};

export const RowFormItem = ({ label, name, element, isEdit = true, style, required, labelStyle }: PropsWithChildren<FormItemRowProps>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <RowWrapper className='row-form-item' style={style} gutter={[16, 16]}>
      {label && (
        <Col span={8} style={{ display: 'flex' }}>
          <Typography className='label' style={labelStyle}>
            {label}
          </Typography>
          {required && <LabelRequired>*</LabelRequired>}
        </Col>
      )}
      <Col span={label ? 16 : 24} className='item'>
        <div style={{ width: '100%', display: 'relative' }}>
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

          <ErrorTextStyles>
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => {
                return <ErrorText type='danger'>{message}</ErrorText>;
              }}
            />
          </ErrorTextStyles>
        </div>
      </Col>
    </RowWrapper>
  );
};

const RowWrapper = styled(Row)`
  //width: 100%;
  padding-top: 16px;
  .label {
    font-size: 14px;
    font-weight: 400;
    //min-width: 150px;
  }
  input {
    border-radius: 6px;
  }
  .item {
    display: flex;
    align-items: center;
  }
  .row-form-item {
    min-height: 500px;
  }
`;

const ErrorText = styled(Text)`
  font-size: 12px;
`;
