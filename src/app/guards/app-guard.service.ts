import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppGuardService implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser =
      sessionStorage.getItem('currentUser') &&
      sessionStorage.getItem('currentUser') !== 'undefined'
        ? JSON.parse(sessionStorage.getItem('currentUser') || '{}')
        : {};
    if (currentUser && currentUser.token) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }

  canLoad() {
    return !!sessionStorage.getItem('currentUser');
  }
}
