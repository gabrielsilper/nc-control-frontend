import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'info-card',
  imports: [CommonModule],
  templateUrl: './info-card.html',
  styleUrl: './info-card.css',
})
export class InfoCard {
  @Input() label: string = '';
  @Input() value: number | string = '';
  @Input() icon: string = '';
  @Input() type: 'success' | 'alert' | 'warn' | 'medium' | 'common' = 'common';

  get infoCardBorderClass() {
    switch (this.type) {
      case 'success':
        return 'info-card-succes-border';
      case 'alert':
        return 'info-card-alert-border';
      case 'warn':
        return 'info-card-warn-border';
      case 'medium':
        return 'info-card-medium-border';
      default:
        return 'info-card-common-border';
    }
  }
}
