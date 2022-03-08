import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../dto/app.dtos';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<any>(environment.END_POINTS.CREATE_USER, user);
  }

  activateUser(usr): Observable<any> {
    return this.http.put(environment.END_POINTS.ACTIVATE_USER, usr)
      .pipe(map((response) => {
        return response;
      }));
  }

  login(user): Observable<User> {
    return this.http.post<any>(environment.END_POINTS.LOGIN, user);
  }

  get isLoggedIn(): boolean {
    const authToken = window.sessionStorage.getItem(environment.TOKEN_KEY);
    return (authToken !== null) ? true : false;
  }

}
