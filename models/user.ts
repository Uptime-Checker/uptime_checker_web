import { ProviderNameGithub, ProviderNameGoogle } from 'constants/default';
import { Subscription } from './subscription';

export enum LoginProvider {
  Email = 1,
  Google,
  Github,
}

export const GetLoginProvider = (provider: string): LoginProvider => {
  switch (provider) {
    case ProviderNameGoogle:
      return LoginProvider.Google;
    case ProviderNameGithub:
      return LoginProvider.Github;
    default:
      return LoginProvider.Email;
  }
};

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

export interface OrganizationResponse {
  data: Organization;
}

export enum RoleType {
  superadmin = 1,
  admin,
  editor,
  member,
}

export interface Claim {
  ID: number;
  Name: string;
}

export interface Role {
  ID: number;
  Name: string;
  Type: RoleType;
  Claims: Claim[];
}

export interface User {
  ID: number;
  Name: string;
  Email: string;
  PictureURL: string;
  Provider: LoginProvider;
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

export enum OrganizationUserStatus {
  active = 1,
  deactivated,
}

export interface OrganizationUser {
  Status: OrganizationUserStatus;
  Organization: Organization;
  Role: Role;
}

export interface OrganizationUserResponse {
  data: OrganizationUser[];
}
