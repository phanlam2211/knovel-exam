import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import styled from 'styled-components';

export function UploadButton(props: any) {
  return (
    <Upload {...props}>
      <StyledButton icon={<UploadOutlined />}>{props.title ? props.title : 'Upload'}</StyledButton>
    </Upload>
  );
}

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  box-shadow: none !important;
  border-radius: 3px !important;
`;
