import { Subscription } from './subscription';

export interface GuestUser {
  ID: number;
  Email: string;
  Code?: string;
  ExpiresAt: string;
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

export interface OrganizationUser {
  organization: Organization;
  role: Role;
}

export interface OrganizationUserResponse {
  data: [OrganizationUser];
}

export interface FullInfo {
  user: User;
  subscription: Subscription;
  organization_users: [OrganizationUser];
}

export interface FullInfoResponse {
  data: FullInfo;
}
