import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private account_service : AccountService){}

  canActivate( next: ActivatedRouteSnapshot,
               state: RouterStateSnapshot
             ): boolean {
    if(this.account_service.isUserLoggedIn()){
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
