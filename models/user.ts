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
  ID: number;
  Name: string;
  Email: string;
  OrganizationID: string;
  PaymentCustomerID?: string;
  Organization: Organization;
  Role: Role;
}

export interface UserResponse {
  data: User;
}

interface AccessToken extends User {
  Token: string;
}

export interface AccessTokenResponse {
  data: AccessToken;
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
