import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.services';

@Injectable({
  providedIn: 'root' // injectable untuk memakai service di dalam service
})

export class GuardService implements CanActivate, CanLoad, CanActivateChild { // service untuk guard routing
  constructor(private sharedService: SharedService, private router: Router) { } // inject api service dan router

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { // method canActivate untuk check login di component parent
    return this.checkToken(route);
  }

  canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

  canLoad (route: Route): Observable<boolean> | Promise<boolean> | boolean { // method canLoad
    return this.checkToken(route);
  }

  checkToken (route): Observable<boolean> | Promise<boolean> | boolean {
    let status = true;
    if (!this.sharedService.getLocalStorage() || !this.sharedService.getLocalStorage().token) status = false;
    if (!status) {
      this.router.navigate(['/']);
      this.sharedService.removeLocalStorage();
      this.sharedService.callAlert(this.sharedService.sessionOver);
    }
    return status;
  }

}
