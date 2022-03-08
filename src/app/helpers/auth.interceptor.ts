import { HttpErrorResponse, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './../services/auth/token-storage.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService, private tokenStorageService: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.token.getToken();
    if (token !== null) {
      authReq = req.clone({
        headers: req.headers.set(environment.TOKEN_HEADER_KEY, token)
          .set(environment.TIMEOUT_KEY, environment.TIMEOUT_MILLISECONDS)
      });
    } else {
      authReq = req.clone({ headers: req.headers.set(environment.TIMEOUT_KEY, environment.TIMEOUT_MILLISECONDS) });
    }

    return next.handle(authReq).
      pipe(catchError(error => {
        if (error.status === 401) {
          this.tokenStorageService.signOut();
          window.location.reload();
        }
        return throwError(error);
      }
      ));
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
