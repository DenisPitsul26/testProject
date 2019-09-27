import {User} from '../models/user.model';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Group} from '../models/group.model';
import {UserService} from './user.service';
import {GroupService} from './group.service';
import {ControlWork} from '../models/controlWork.model';
import {OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {take} from 'rxjs/operators';

export class AccessControlWorkGuard implements CanActivate, CanActivateChild {
  loginedUser: User;
  controlWork: ControlWork[];
  sub12: Subscription;
  canActivateFlag = false;
  private sub3: Subscription;
  isFirstClick = false;

  constructor(private router: Router, private usersService: UserService, private groupsService: GroupService) {}

  getCanActivateFlag() {
    return this.canActivateFlag;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
    if (this.loginedUser.isAdmin === 1) {
      return true;
    } else {
          this.usersService.getUserById(this.loginedUser.id).subscribe((user: User) => {
            this.loginedUser = user;
            this.sub12 = this.groupsService.getGroupById(this.loginedUser.groupId).subscribe((group: Group) => {
              this.controlWork = group.expectedControlWorks;
              if (this.loginedUser.resultsOfControlWorks.length > 0) {
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < this.controlWork.length; i++) {
                  // tslint:disable-next-line:prefer-for-of
                  for (let j = 0; j < this.loginedUser.resultsOfControlWorks.length; j++) {
                    if (this.controlWork[i].id === this.loginedUser.resultsOfControlWorks[j].controlWork.id) {
                      this.canActivateFlag = true;
                      return this.canActivateFlag;
                    }
                  }
                }
              } else {
                console.log('fssdfds');
                this.canActivateFlag = true;
                return this.canActivateFlag;
              }
            });
          });
          this.isFirstClick = true;
          this.usersService.getUserById(this.loginedUser.id).toPromise().then((user: User) => {
            if (!this.canActivateFlag) {
              this.router.navigate(['/system/choose_control_work'], {
                queryParams: {
                  accessDenied: true
                }
              });
            }
          });
    }
    return this.canActivateFlag;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
