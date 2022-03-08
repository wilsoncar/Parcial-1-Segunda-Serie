import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public http: HttpClient) { }

  getRandomImage(): Observable<any> {
    return this.http.get<any>(environment.END_POINTS.RANDOM_IMAGE);
  }

  getFavoriteDog(mail): Observable<any> {
    return this.http.post<any>(environment.END_POINTS.FAVORITE_DOG, { email: mail });
  }

  createFavoriteDog(obj): Observable<any> {
    return this.http.post<any>(environment.END_POINTS.CREATE_FAVORITE_DOG, obj);
  }

  updateFavoriteDog(obj): Observable<any> {
    return this.http.put<any>(environment.END_POINTS.UPDATE_FAVORITE_DOG, obj);
  }

}
