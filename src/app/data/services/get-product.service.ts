//get-product.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
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


  filteredProductsS = signal<Product[]>([])
  getProductsFiltered(findWord: string){
    const params = new HttpParams().set('findWord', findWord);
    return this.http.get<Product[]>("http://localhost:3000/getProductsFiltered", { params });
  }
}