import { Product } from "./product";

//OrderState.ts
export interface OrderState {
  price: number,
  fullPrice: number,
  discountPrice: number,
  discount: number,
  quantity: number,
  address: string,
  delivery: string,
  payment: string,

  products: [Product, number, boolean][],
  // products: [number, number][],
}