import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {canActivate} from '@angular/fire/auth-guard';

@Injectable()
export class AccessRoutingStudentGuard implements CanActivate, CanActivateChild {
  loginedUser: User;

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
    if (this.loginedUser.isAdmin === 1 || this.loginedUser.isAdmin === 2) {
      return true;
    } else if (this.loginedUser.isAdmin === 0) {
      this.router.navigate(['/system/scores'], {
        queryParams: {
          accessDenied: true
        }
      });
    }
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
