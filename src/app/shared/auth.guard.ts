import { LoginService } from './../services/login/login.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate, Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
    public loginService: LoginService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.loginService.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
