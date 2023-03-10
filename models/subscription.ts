import { Product } from './product';

export enum PlanType {
  Monthly = 'monthly',
  Yearly = 'yearly',
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
  Product: Product;
  Type: PlanType;
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
