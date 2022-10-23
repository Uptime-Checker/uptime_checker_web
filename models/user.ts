export interface GuestUser {
  id: number;
  email: string;
  code?: string;
  expires_at: string;
}

export interface GuestUserResponse {
  data: GuestUser;
}
