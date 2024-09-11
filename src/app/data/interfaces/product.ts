//product.ts
export interface Product {
  id: string;
  isHitProduct: boolean;
  isNewProduct: boolean;
  price: number;
  oldPrice: number;
  description: string;
  rating: number;
  selled: number;
  name: string;
  count: number;
  imagesUrl: string[]; // Обновлено для массива URL
  details: {
    smallDesc: string[];
    allDesc: { className: string, inner: string }[];
    details: [string][];
  };
}