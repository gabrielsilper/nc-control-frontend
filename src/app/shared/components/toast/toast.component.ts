import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';
import { NotificationType } from '../../../core/models/notification.model';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  protected notificationService = inject(NotificationService);
  protected NotificationType = NotificationType;

  iconFor(type: NotificationType): string {
    switch (type) {
      case NotificationType.Success:
        return 'check_circle';
      case NotificationType.Info:
        return 'info';
      default:
        return 'error';
    }
  }
}
