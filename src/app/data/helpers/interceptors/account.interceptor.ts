//account.interceptor.ts
import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AccountService } from "../../services/account.service";

export const accountTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string | null = inject(AccountService).token;

  if (!token) return next(req)
  
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })

  return(next(req)) 
}