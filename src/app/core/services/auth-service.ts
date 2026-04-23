import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  ACCESS_TOKEN,
  AuthResponse,
  LoginRequest,
  LoginResponse,
  REFRESH_TOKEN,
  USER_ID,
  USER_PROFILE,
} from '../models/auth.model';
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
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem(ACCESS_TOKEN, res.accessToken);
        localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
        localStorage.setItem(USER_ID, res.user.id);
        localStorage.setItem(USER_PROFILE, res.user.profile);
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
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(USER_PROFILE);
    this.isAuthenticated.set(false);
    return this.http.post(`${this.API_URL}/logout`, { refreshToken });
  }

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  getUserId() {
    return localStorage.getItem(USER_ID);
  }

  getUserProfile() {
    return localStorage.getItem(USER_PROFILE);
  }
}
