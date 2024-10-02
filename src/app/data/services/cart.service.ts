import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts: [Product, number][] =  []

  constructor() { }
}
