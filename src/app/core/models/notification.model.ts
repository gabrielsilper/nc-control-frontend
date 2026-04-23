export enum NotificationType {
  Error = 'error',
  Success = 'success',
  Info = 'info',
}

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}
