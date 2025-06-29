import { Tooltip, type TooltipProps } from 'antd';
import React, { type PropsWithChildren, type ReactNode } from 'react';

// Xác định kiểu cho props của CommonToolTip, kết hợp với TooltipProps từ Ant Design
type CommonToolTipProps = TooltipProps & {
  title: ReactNode;
};

export const CommonToolTip: React.FC<PropsWithChildren<CommonToolTipProps>> = ({ title, children, ...props }) => {
  return (
    <Tooltip title={title} {...props}>
      {children}
    </Tooltip>
  );
};
