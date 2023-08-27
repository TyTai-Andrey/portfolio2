import {
  Store,
  NotificationTitleMessage,
  NOTIFICATION_TYPE,
} from 'react-notifications-component';
type ShowWarning = {
  title?: NotificationTitleMessage;
  message?: NotificationTitleMessage;
  id?: string | undefined;
  type?: NOTIFICATION_TYPE | undefined;
};

export const showNotification = ({ title, message, id, type }: ShowWarning) => {
  Store.addNotification({
    title,
    message,
    type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate', 'fadeIn'],
    animationOut: ['animate', 'fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true,
      click: true,
    },
    id,
  });
};
