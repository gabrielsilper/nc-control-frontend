import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse, LoginRequest } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/auth`;

  login(credentials: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials);
  }
}
