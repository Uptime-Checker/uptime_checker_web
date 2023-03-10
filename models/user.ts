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
  ID: number;
  Name: string;
  Slug: string;
}

export enum RoleType {
  superadmin = 'superadmin',
  admin = 'admin',
  editor = 'editor',
  member = 'member',
}

export interface Claim {
  ID: number;
  Name: string;
}

export interface Role {
  ID: number;
  Name: string;
  Type: RoleType;
  Claims: [Claim];
}

export interface User {
  ID: number;
  Name: string;
  Email: string;
  OrganizationID: string;
  PaymentCustomerID?: string;
  Organization: Organization;
  Role: Role;
  Subscription: Subscription;
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
