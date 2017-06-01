import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ScopeGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const scopes = route.data.expectedScopes;

    if (this.auth.isAuthenticated()) {
      if (this.auth.userHasScopes(scopes)) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    }
    return true
  }

}
