import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService); // inject the cookie service
  const router = inject(Router); // inject the router
  const token = cookieService.get('token'); // get the token
  if (!token) {
    router.navigate(['/']); // navigate to login if the token is not found
    return false; // return false if the token is not found
  }
  return true; // return true if the token is found

};
