import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


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
}
