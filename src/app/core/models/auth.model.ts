export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse extends AuthResponse {
  user: { id: string; profile: string };
}

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
export const USER_ID = 'user_id';
export const USER_PROFILE = 'user_profile';
