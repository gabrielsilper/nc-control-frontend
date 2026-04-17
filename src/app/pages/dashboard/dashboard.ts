import { Component } from '@angular/core';
import { InfoCard } from '../../shared/components/info-card/info-card';
import { Bagde } from '../../shared/components/bagde/bagde';
import { TypeNc } from '../../core/models/non-conformity.model';

@Component({
  selector: 'app-dashboard',
  imports: [InfoCard, Bagde],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  typeNc = TypeNc;
}
