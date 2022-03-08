import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(public router: Router) { }

  signOut() {
    window.sessionStorage.removeItem(environment.TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(environment.TOKEN_KEY);
    window.sessionStorage.setItem(environment.TOKEN_KEY, token);

  }

  public getToken(): any {
    const token = window.sessionStorage.getItem(environment.TOKEN_KEY);
    if (token !== null) {
      return token;
    } else {
      return null;
    }
  }

  public getHaveToken(): boolean {
    if (window.sessionStorage.getItem(environment.TOKEN_KEY) !== null) {
      return true;
    } else {
      return false;
    }
  }

  public saveUser(user: any) {
    window.sessionStorage.removeItem(environment.USER_KEY);
    window.sessionStorage.setItem(environment.USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    const userSession = window.sessionStorage.getItem(environment.USER_KEY);

    if (userSession !== null) {
      return JSON.parse(userSession);
    } else {
      return null;
    }
  }

}
