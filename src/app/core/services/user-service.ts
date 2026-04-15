import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserCreateRequest, UserResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/users`;

  create(userData: UserCreateRequest) {
    return this.http.post<UserResponse>(`${this.API_URL}`, userData);
  }
}
