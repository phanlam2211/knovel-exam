import type { MenuProps } from 'antd';
import { BarChartOutlined, FileTextOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { useGetCurrentUser } from '../../../hooks/use-get-current-user';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const useMenu = () => {
  const { isEmployyer } = useGetCurrentUser();

  const menus: MenuProps['items'] = [
    getItem('Manage Tasks', '/manage-tasks', <FileTextOutlined />),
    ...(isEmployyer
      ? [
          getItem('Manage Employees', '/manage-employees', <TeamOutlined />),
          getItem('Employee Task Summary', '/employee-task-summary', <BarChartOutlined />),
        ]
      : []),
    {
      type: 'divider',
    },
    getItem('Settings', 'settings', <SettingOutlined />, [
      getItem('Profile', '/settings/profile'),
      getItem('Account', '/settings/account'),
      getItem('Preferences', '/settings/preferences'),
    ]),
  ];

  return {
    menus,
    getItem,
  };
};
