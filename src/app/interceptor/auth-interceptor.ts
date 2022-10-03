import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiService } from '../services/api.service';
import { catchError } from "rxjs/operators";
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.services';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
  constructor (private sharedService: SharedService, private router: Router) {}
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const type = "application/json; charset=utf-8";
    const headers = new HttpHeaders({
      'Accept': 'text/html, application/json, text/plain, multipart/form-data, */*',
      'Authorization': 'Bearer ' + this.sharedService.getLocalStorage().token
    });

    const updatedRequest = req.clone({
      withCredentials: true,
      headers: headers
    });

    return next.handle(updatedRequest).pipe(
      catchError(( { error }: HttpErrorResponse) => {
        return throwError(error);
     })
    );
  }
}
