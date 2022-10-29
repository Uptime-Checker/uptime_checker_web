export interface GuestUser {
  id: number;
  email: string;
  code?: string;
  expires_at: string;
}

export interface GuestUserResponse {
  data: GuestUser;
}

export interface AccessToken {
  access_token: string;
}

export enum AuthProvider {
  email = 'email',
  google = 'google',
  apple = 'apple',
  github = 'github',
}

export interface Organization {
  id: number;
  name: string;
  slug: string;
}

export enum RoleType {
  superadmin = 'superadmin',
  admin = 'admin',
  editor = 'editor',
  member = 'member',
}

export interface Claim {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
  type: RoleType;
  claims: [Claim];
}

export interface User {
  id: number;
  name: string;
  email: string;
  organization_id: string;
  payment_customer_id?: string;
  organization: Organization;
  role: Role;
}

export interface UserResponse {
  data: User;
}
