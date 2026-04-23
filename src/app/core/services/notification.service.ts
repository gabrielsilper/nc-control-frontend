import { Injectable, signal } from '@angular/core';
import { Notification, NotificationType } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notifications = signal<Notification[]>([]);

  private nextId = 0;

  show(message: string, type: NotificationType = NotificationType.Error): void {
    const id = this.nextId++;
    this.notifications.update((list) => [...list, { id, message, type }]);
    setTimeout(() => this.dismiss(id), 5000);
  }

  dismiss(id: number): void {
    this.notifications.update((list) => list.filter((n) => n.id !== id));
  }
}
