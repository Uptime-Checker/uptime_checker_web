export enum PlanType {
  Monthly = 1,
  Yearly = 2,
}

export enum SubscriptionStatus {
  Incomplete = 'incomplete',
  IncompleteExpired = 'incomplete_expired',
  Trialing = 'trialing',
  Active = 'active',
  PastDue = 'past_due',
  Canceled = 'canceled',
  Unpaid = 'unpaid',
}

export interface Plan {
  ID: number;
  Price: number;
  ExternalID: string;
  Product: Product;
  Type: PlanType;
}

export enum ProductTier {
  free = 1,
  developer,
  startup,
  enterprise,
}

export interface Product {
  ID: number;
  Name: string;
  Description: string;
  ExternalID: string;
  Tier: ProductTier;
  Popular: boolean;
  Plans: Plan[];
}

export interface ProductResponse {
  data: Product[];
}

export interface Subscription {
  ID: string;
  Status: SubscriptionStatus;
  IsTrial: boolean;
  Product: Product;
  Plan: Plan;
  StartsAt: string;
  ExpiresAt: string;
}
