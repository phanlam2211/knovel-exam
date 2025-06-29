import { Drawer } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import type { PropsWithChildren } from 'react';
import styled from 'styled-components';

export function CommonDrawer({ children, ...props }: PropsWithChildren<DrawerProps>) {
  const { title, placement, width } = props;
  return (
    <DrawerWrapper title={title} placement={placement} width={width} onClose={props.onClose} open={props.open} extra={props.extra}>
      {children}
    </DrawerWrapper>
  );
}

const DrawerWrapper = styled(Drawer)`
  .ant-drawer-header {
    height: 40px;
  }
  .ant-drawer-body {
    padding: 16px;
  }
`;
