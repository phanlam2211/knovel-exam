import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
export const openNotification = (type: NotificationType, messages: string) => {
  notification[type]({
    message: '',
    description: messages,
    placement: 'bottomLeft',
  });
};
