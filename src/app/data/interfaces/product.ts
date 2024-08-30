export interface Product {
  _id: { $oid: string; };
  isHitProduct: boolean;
  isNewProduct: boolean;
  price: number;  
  oldPrice: number;  
  description: string;  
  rating: number;  
  selled: number;  
  name: string;
  mainImageUrl: string;  // Новый параметр для URL изображения
}