import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { InfoCard } from '../../shared/components/info-card/info-card';
import { Bagde } from '../../shared/components/bagde/bagde';
import {
  DashboardCountsResponse,
  DashboardRankingResponse,
  NonConformityResponse,
  StatusNc,
  TypeNc,
} from '../../core/models/non-conformity.model';
import { NonConformityService } from '../../core/services/non-conformity-service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [InfoCard, Bagde],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly nonConformityService = inject(NonConformityService);
  private readonly cdr = inject(ChangeDetectorRef);
  loading = false;
  dashboardCounts!: DashboardCountsResponse;
  dashboardRanking: DashboardRankingResponse[] = [];
  nonConformities: NonConformityResponse[] = [];

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    forkJoin({
      counts: this.nonConformityService.getDashboardCounts(),
      ranking: this.nonConformityService.getDashboardRanking(),
      nonConformitiesData: this.nonConformityService.getNonConformities({ order: 'DESC' }),
    }).subscribe({
      next: (res) => {
        this.dashboardCounts = res.counts;
        this.dashboardRanking = res.ranking;
        this.nonConformities = res.nonConformitiesData.items;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        console.error('Ocorreu um erro!', err);
      },
    });
  }

  getStatusLabel(status: StatusNc): string {
    return StatusNc[status];
  }
}
