import { Component, Input } from '@angular/core';
import { SeverityNc } from '../../../core/models/non-conformity.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bagde-component',
  imports: [CommonModule],
  templateUrl: './bagde.html',
  styleUrl: './bagde.css',
})
export class Bagde {
  @Input() severity: SeverityNc = SeverityNc.BAIXA;
  severityNc = SeverityNc;

  get severityClass(): string {
    switch (this.severity) {
      case SeverityNc.BAIXA:
        return 'bagde-common';
      case SeverityNc.MEDIA:
        return 'bagde-medium';
      case SeverityNc.ALTA:
        return 'bagde-warn';
      case SeverityNc.CRITICA:
        return 'bagde-alert';
      default:
        return '';
    }
  }
}
