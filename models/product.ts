export interface Price {
  id: string;
  interval: string;
  type: string;
  cost: number;
  currency: string;
}

export interface Product {
  id: number;
  name: string;
  prices: [Price];
}

export interface ProductResponse {
  data: [Product];
}
