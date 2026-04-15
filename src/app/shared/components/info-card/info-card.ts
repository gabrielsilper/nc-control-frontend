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
  @Input() type: 'success' | 'danger' | 'warning' | 'neutral' = 'neutral';
}
