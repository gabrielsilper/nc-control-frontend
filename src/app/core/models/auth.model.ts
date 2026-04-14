export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
