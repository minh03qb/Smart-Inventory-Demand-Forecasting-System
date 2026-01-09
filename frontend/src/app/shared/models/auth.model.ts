export interface User {
  id?: string;
  username: string;
  roles: string[];
}

export interface AuthRequest {
  username: string;
  password: string;
  roles?: string[];
}

export interface AuthResponse {
  token: string;
  username: string;
  roles: string[];
}
