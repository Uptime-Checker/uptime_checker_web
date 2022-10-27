export interface GuestUser {
  id: number;
  email: string;
  code?: string;
  expires_at: string;
}

export interface GuestUserResponse {
  data: GuestUser;
}

export interface LoginResponse {
  data: AccessToken;
}

interface AccessToken {
  access_token: string;
}

export enum AuthProvider {
  email = 'email',
  google = 'google',
  apple = 'apple',
  github = 'github',
}
