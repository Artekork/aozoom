import { inject } from "@angular/core"
import { AccountService } from "../../services/account.service"
import { Router } from "@angular/router";

export const canActivateAuth = () => {
  
  const isLoggedIn: boolean = inject(AccountService).isLoggedIn();  
  
  if (isLoggedIn) {
    return true
  } 
  
  return inject(Router).createUrlTree(['/'])
}