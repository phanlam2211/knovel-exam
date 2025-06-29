import { Button } from 'antd';
import type { ButtonProps } from 'antd/es/button/button';
import React from 'react';
import styled from 'styled-components';

export function CommonButton({ children, ...props }: React.PropsWithChildren<ButtonProps>) {
  return <ButtonWrapper {...props}>{children}</ButtonWrapper>;
}

const ButtonWrapper = styled(Button)`
  display: flex;
  align-items: center;
  box-shadow: none !important;
  border-radius: 3px !important;
`;
