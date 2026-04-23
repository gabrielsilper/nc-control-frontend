import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  DashboardCountsResponse,
  DashboardRankingResponse,
  FindNonConformitiesQuery,
  NonConformitiesResponse,
  NonConformityCreateRequest,
  NonConformityResponse,
} from '../models/non-conformity.model';

@Injectable({
  providedIn: 'root',
})
export class NonConformityService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/non-conformities`;

  getDashboardCounts() {
    return this.http.get<DashboardCountsResponse>(`${this.API_URL}/counts`);
  }

  getDashboardRanking() {
    return this.http.get<DashboardRankingResponse>(`${this.API_URL}/ranking`);
  }

  create(payload: NonConformityCreateRequest) {
    return this.http.post<NonConformityResponse>(`${this.API_URL}`, payload);
  }

  getNonConformities(findNonConformitiesQuery: FindNonConformitiesQuery) {
    const params = new HttpParams({ fromObject: findNonConformitiesQuery });
    return this.http.get<NonConformitiesResponse>(`${this.API_URL}`, { params });
  }
}
