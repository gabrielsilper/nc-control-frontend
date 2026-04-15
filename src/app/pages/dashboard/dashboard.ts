import { Component } from '@angular/core';
import { InfoCard } from "../../shared/components/info-card/info-card";

@Component({
  selector: 'app-dashboard',
  imports: [InfoCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
