import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DogsService {

  constructor(public http: HttpClient) { }

  getAllDogs(): Observable<any> {
    return this.http.get<any>(environment.END_POINTS.HOME);
  }

  getGalleryDogs(): Observable<any> {
    return this.http.get<any>(environment.END_POINTS.GALLERY);
  }

}
