export enum Profile {
  OPERADOR,
  RESPONSAVEL,
  GESTOR,
}

export interface UserCreateRequest {
  name: string;
  password: string;
  email: string;
  profile: Profile;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  profile: Profile;
}
