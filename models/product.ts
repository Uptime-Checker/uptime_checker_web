export interface Price {
  id: string;
  interval: string;
  type: string;
  cost: number;
  currency: string;
}

export interface Product {
  ID: number;
  Name: string;
  Prices: [Price];
}

export interface ProductResponse {
  data: [Product];
}
