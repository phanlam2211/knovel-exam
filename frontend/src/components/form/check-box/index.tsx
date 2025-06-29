import styled from 'styled-components';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent, CheckboxProps } from 'antd/es/checkbox';
import type { ReactNode } from 'react';

type FormCheckBoxProps = CheckboxProps & {
  value?: boolean;
  addOnBefore?: ReactNode;
  addOnAfter?: ReactNode;
};

export const FormCheckBox = ({ value, addOnBefore, addOnAfter, onChange, ...props }: FormCheckBoxProps) => {
  return (
    <FormCheckBoxStyle>
      {addOnBefore}
      <Checkbox {...props} checked={value} onChange={(e: CheckboxChangeEvent) => onChange?.(e.target.checked as any)} />
      {addOnAfter}
    </FormCheckBoxStyle>
  );
};

const FormCheckBoxStyle = styled.div`
  display: flex;
  align-items: center;
  .label {
    margin-left: 5px;
  }
`;
