import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  get isLoggedIn(): boolean {
    const authToken = window.sessionStorage.getItem(environment.TOKEN_KEY);
    return (authToken !== null) ? true : false;
  }

}
