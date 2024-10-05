import { inject, Injectable, signal } from '@angular/core';
import { AccountService } from './account.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);


  accountService = inject(AccountService)
  constructor(private cookieService: CookieService) { }

  addToCart(name:string, count: number = 1): boolean{
    if (this.accountService.isLoggedIn()){
      alert(`Добавлено в залогиненого пользователя ${count} tovar` )
      return true
    } 
    
    let userInfo;

    if (this.cookieService.get('userInfo')){
      userInfo = JSON.parse(this.cookieService.get('userInfo'));
    } else {
      userInfo = { cart: {}}
    }

    if (!userInfo.cart){
      console.log('ee neeeet');
      userInfo.cart = {};
    }
    userInfo.cart[name] = count;

    this.cookieService.set('userInfo', JSON.stringify(userInfo));

    return true
  }
  
  removeOnCart(name:string): boolean{
    if (this.accountService.isLoggedIn()){
      alert(`Убранно у залогиненого` )
      return true
    } 

    
    
    let userInfo;

    if (this.cookieService.get('userInfo')){
      userInfo = JSON.parse(this.cookieService.get('userInfo'));
    } else {
      userInfo = { cart: {}}
    }

    if (userInfo.cart[name]){
      delete userInfo.cart[name];
      this.cookieService.set('userInfo', JSON.stringify(userInfo));

      return true
    }
    return false
  }

  addToFavorite(name:string){
    if (this.accountService.isLoggedIn()){
      alert(`Добавлено в залогиненого пользователя tovar` )
      return true
    } 
    
    let userInfo;

    if (this.cookieService.get('userInfo')){
      userInfo = JSON.parse(this.cookieService.get('userInfo'));
    } else {
      userInfo = { favorites: []}
    }

    if (!userInfo.favorites){
      console.log('ee neeeet');
      userInfo.favorites = [];
    }

    if (userInfo.favorites.includes(name)){
      console.log("yje est")
      return true
    }
    userInfo.favorites.push(name);

    this.cookieService.set('userInfo', JSON.stringify(userInfo));

    return true
  }
  
  removeOnFavorite(name:string): boolean{
    if (this.accountService.isLoggedIn()){
      alert(`Убранно у залогиненого` )
      return true
    } 

    let userInfo;

    if (this.cookieService.get('userInfo')){
      userInfo = JSON.parse(this.cookieService.get('userInfo'));
    } else {
      userInfo = { favorites:[]}
    }

    if (userInfo.favorites.includes(name)){
      userInfo.favorites.splice(userInfo.favorites.indexOf(name), 1)

      this.cookieService.set('userInfo', JSON.stringify(userInfo));

      return true
    }
    return false
  }

  isFavorite(name:string): boolean{
    if (this.accountService.isLoggedIn()){
      alert(`Добавлено в залогиненого пользователя tovar` )
      return true
    } 
    
    let userInfo;

    if (this.cookieService.get('userInfo')){
      userInfo = JSON.parse(this.cookieService.get('userInfo'));
    } else {
      return false
    }

    if (!userInfo.favorites){
      return false
    }

    if (userInfo.favorites.includes(name)){
      return true
    }
  
    return false
  }

  isCart(name:string): boolean{
    if (this.accountService.isLoggedIn()){
      alert(`Добавлено в залогиненого пользователя  tovar` )
      return true
    } 
    
    let userInfo;

    if (this.cookieService.get('userInfo')){
      userInfo = JSON.parse(this.cookieService.get('userInfo'));
    } else {
      return false
    }

    if (!userInfo.cart[name]){
      return false
    }
    
    return true
  }

  calcDiscount(oldPrice: number, price: number){
    return Math.round((1-(price/oldPrice))*100)
  }







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

  getCartProducts(cart: [string, number][]){
    let cartProducts:[Product, number, boolean][] = [];
    for (let elem in cart){
      

      this.getProduct(cart[elem][0]).subscribe(val => {
        cartProducts.push([val, cart[elem][1], true])
      })
    }

    return cartProducts;
  }

  
}
