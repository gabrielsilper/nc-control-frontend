import { Component } from '@angular/core';
import { InfoCard } from "../../shared/components/info-card/info-card";
import { Bagde } from "../../shared/components/bagde/bagde";

@Component({
  selector: 'app-dashboard',
  imports: [InfoCard, Bagde],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
