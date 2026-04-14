import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ACCESS_TOKEN, AuthResponse, LoginRequest, REFRESH_TOKEN } from '../models/auth.model';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/auth`;

  isAuthenticated = signal<boolean>(!!localStorage.getItem(ACCESS_TOKEN));

  login(credentials: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem(ACCESS_TOKEN, res.accessToken);
        localStorage.setItem(REFRESH_TOKEN, res.refreshToken);

        this.isAuthenticated.set(true);
      }),
    );
  }

  refresh(refreshToken: string) {
    return this.http.post<AuthResponse>(`${this.API_URL}/refresh`, { refreshToken }).pipe(
      tap((res) => {
        localStorage.setItem(ACCESS_TOKEN, res.accessToken);
        localStorage.setItem(REFRESH_TOKEN, res.refreshToken);

        this.isAuthenticated.set(true);
      }),
    );
  }

  logout(refreshToken: string) {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    this.isAuthenticated.set(false);
    return this.http.post<AuthResponse>(`${this.API_URL}/logout`, { refreshToken });
  }

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  }
}
