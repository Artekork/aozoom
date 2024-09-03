//get-product.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class GetProductService {
  http = inject(HttpClient);

  constructor() { }

  getProducts(filter: any){
    return this.http.get<Product[]>("http://localhost:3000/getProducts", { params: filter });
  }

  getProduct(productId: string){
    return this.http.get<Product>(`http://localhost:3000/getProduct/${productId}`);
  }
}