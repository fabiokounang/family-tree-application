import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from "rxjs/operators";
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.services';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
  constructor (private sharedService: SharedService, private router: Router) {}
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const type = "application/json; charset=utf-8";
    const headerOpt = {
      'Accept': 'text/html, application/json, text/plain, multipart/form-data, */*'
    }
    if (this.sharedService.getLocalStorage().token) headerOpt['Authorization'] = 'Bearer ' + this.sharedService.getLocalStorage().token;
    const headers = new HttpHeaders(headerOpt);

    const updatedRequest = req.clone({
      withCredentials: true,
      headers: headers
    });

    return next.handle(updatedRequest).pipe(
      retry(3),
      catchError(( { error }: HttpErrorResponse) => {
        if (error && error.error && error.error === 'Not Authenticated') {
          console.log(error, 'error')
          this.sharedService.removeLocalStorage();
          this.router.navigate(['/']);
          error.error = this.sharedService.sessionOver
          return throwError(error);
        }
        return throwError(error);
     })
    );
  }
}
