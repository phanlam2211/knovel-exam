import { Button, Col, Dropdown, Menu, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetCurrentUser } from '../../../hooks/use-get-current-user';
import { clearTokens } from '../../../swagger-api/axios';
import { authService } from '../../../swagger-api';

export const Header = () => {
  const navigate = useNavigate();
  const { data: currentUser } = useGetCurrentUser();
  console.log('currentUser', currentUser);

  const handleLogout = async () => {
    // Clear token, redirect to login, etc.
    await authService.authControllerLogout();
    localStorage.removeItem('currentUser');
    clearTokens();
    navigate('/sign-in');
  };

  const menu = (
    <Menu>
      <Menu.Item key='email' disabled>
        {currentUser?.email}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='logout'>
        <Button type='text' danger block onClick={handleLogout}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderStyle>
      <LogoHeader onClick={() => navigate('/')}>Task Management</LogoHeader>
      <Row gutter={16}>
        <Col>
          <Dropdown overlay={menu} placement='bottomRight' trigger={['click']}>
            <span style={{ cursor: 'pointer', fontWeight: 500 }}>{currentUser?.email || 'User'} ▼</span>
          </Dropdown>
        </Col>
      </Row>
      {/* <UserDetailSideModal /> */}
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  justify-items: center;
  border-bottom: 1px solid #e8e8e8;
  height: 40px;
  align-items: center;
  padding: 0 24px;
  z-index: 999;
  background: white;
`;

const LogoHeader = styled.div`
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  color: #1890ff;
`;
