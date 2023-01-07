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
  id: number;
  price: number;
  product: Product;
  type: PlanType;
}

export interface Subscription {
  id: string;
  status: SubscriptionStatus;
  is_trial: boolean;
  product: Product;
  plan: Plan;
  starts_at: string;
  expires_at: string;
}
