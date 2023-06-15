export interface OrderResponse {
  orders: Order[];
  single: number;
  count: number;
}

export interface Order {
  payment: Payment;
  _id: string;
  address: Address;
  user: User;
  order: OrderDetails[];
  status: "processing" | "shipped" | "delivered";
  created: string;
  __v: number;
}

interface User {
  name: string;
  email: string;
}

export interface OrderDetails {
  product: Product;
  name: string;
  quantity: number;
  imageURL: string;
  price: number;
}

export interface Product {
  seller: string;
  rating: number;
  category: string;
  created: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: number;
  phone: number;
  country: string;
  created: string;
}

export interface Payment {
  id: string;
  status: string;
  tax: number;
  amount: number;
}
