//account.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Account } from '../interfaces/account';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:3000'; 
  public token = this.cookieService.get('jwt');

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    alert(`token = ${this.token}`)
  }
  
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  
  registerUser(data: any){
    return this.http.post<any>("http://localhost:3000/registerUser", data);
  }
  
  login(data: any){
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }

  updateInfo(userInfo: any){
    return this.http.put<any>(`${this.apiUrl}/updateInfo`, { userInfo: userInfo });
  }

  getUserInfo(token: string){
    return this.http.get<Account>("http://localhost:3000/getUserInfo", { 
      params: { token } 
    });
  }

  logout(){
    this.cookieService.delete('jwt', '/');
  }

  setToken(token: string): void {
    this.cookieService.set('jwt', token, 60, '/'); // Сохраняем токен в куки
    this.token = this.cookieService.get('jwt');
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('jwt');
  }

  addToCart(){

  }

  addToFavorite(){
    
  }
}
