import { Col, Space } from 'antd';
import type { ReactNode } from 'react';

type CollapseFilterProps = {
  top: ReactNode;
  bottom: ReactNode;
};

export function CollapseFilter(props: CollapseFilterProps) {
  return (
    <Col>
      <Space>
        <>{props.top}</>
      </Space>
      <div style={{ marginTop: '8px' }}>{props.bottom}</div>
    </Col>
  );
}
