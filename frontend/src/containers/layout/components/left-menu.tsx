import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useMenu } from '../hooks/use-menu';

export function LeftMenu() {
  const { menus } = useMenu();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openedKeys, setOpenedKeys] = useState<string[]>([]);
  const [collapsed, setCollapse] = useState(false);

  const onClick: MenuProps['onClick'] = (e) => {
    const { ctrlKey, metaKey } = e.domEvent;

    if (e.keyPath.length > 1) {
      return;
    }

    if (ctrlKey || metaKey) {
      window.open(e.key as string, '_blank', 'noopener,noreferrer');
      return;
    }

    // Navigate đến route
    navigate(e.key as string);
  };

  useEffect(() => {
    const pathname = location.pathname;
    const pathList = pathname.split('/').filter(Boolean);

    if (pathList.length === 1) {
      setSelectedKeys([`/${pathList[0]}`]);
    } else if (pathList.length >= 2) {
      const parentKey = pathList[0];
      const childKey = pathList.slice(0, 2).join('/');
      setSelectedKeys([`/${childKey}`]);
      setOpenedKeys([parentKey]);
    }
  }, [location.pathname]);

  const handleCollapse = () => {
    setCollapse(!collapsed);
  };

  return (
    <LeftMenuContainer>
      <MenuWrapper
        onClick={onClick}
        defaultSelectedKeys={[]}
        defaultOpenKeys={[]}
        openKeys={openedKeys}
        onOpenChange={(openKeys) => {
          setOpenedKeys(openKeys as string[]);
        }}
        selectedKeys={selectedKeys}
        mode='inline'
        items={menus}
        inlineCollapsed={collapsed}
        style={{
          width: collapsed ? 80 : 230,
          height: '100%',
          borderRight: '1px solid #f0f0f0',
        }}
      />

      <CollapseWrapper>
        <Button type='text' icon={collapsed ? <RightOutlined /> : <LeftOutlined />} onClick={handleCollapse} size='small' />
      </CollapseWrapper>
    </LeftMenuContainer>
  );
}

const LeftMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
`;

const CollapseWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
`;

const MenuWrapper = styled(Menu)`
  flex: 1;
  overflow-y: auto;

  .ant-menu-item {
    margin: 4px 8px;
    border-radius: 6px;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .ant-menu-item-selected {
    background-color: #1890ff !important;
    color: white !important;
  }

  .ant-menu-submenu-title {
    margin: 4px 8px;
    border-radius: 6px;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .ant-menu-inline-collapsed {
    width: 80px;
  }
`;
