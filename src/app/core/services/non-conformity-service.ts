import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  DashboardCountsResponse,
  DashboardRankingResponse,
  FindNonConformitiesQuery,
  NonConformitiesResponse,
} from '../models/non-conformity.model';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class NonConformityService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/non-conformities`;
  private readonly authService = inject(AuthService);

  getTokenHeader() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.getAccessToken()!,
    });
  }

  getDashboardCounts() {
    return this.http.get<DashboardCountsResponse>(`${this.API_URL}/counts`, {
      headers: this.getTokenHeader(),
    });
  }

  getDashboardRanking() {
    return this.http.get<DashboardRankingResponse>(`${this.API_URL}/ranking`, {
      headers: this.getTokenHeader(),
    });
  }

  getNonConformities(findNonConformitiesQuery: FindNonConformitiesQuery) {
    const params = new HttpParams({ fromObject: findNonConformitiesQuery });

    return this.http.get<NonConformitiesResponse>(`${this.API_URL}`, {
      params,
      headers: this.getTokenHeader(),
    });
  }
}
