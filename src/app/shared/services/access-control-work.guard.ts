import {User} from '../models/user.model';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Group} from '../models/group.model';
import {UserService} from './user.service';
import {GroupService} from './group.service';
import {ControlWork} from '../models/controlWork.model';
import {OnDestroy} from '@angular/core';

export class AccessControlWorkGuard implements CanActivate, CanActivateChild {
  loginedUser: User;
  controlWork: ControlWork[];
  sub12: Subscription;
  canActivateFlag = false;
  private sub3: Subscription;

  constructor(private router: Router, private usersService: UserService, private groupsService: GroupService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
    if (this.loginedUser.isAdmin === 1) {
      return true;
    } else {
          this.usersService.getUserById(this.loginedUser.id).subscribe((user: User) => {
            this.loginedUser = user;
            this.sub12 = this.groupsService.getGroupById(this.loginedUser.groupId).subscribe((group: Group) => {
              this.controlWork = group.expectedControlWorks;
                // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < this.controlWork.length; i++) {
                  // tslint:disable-next-line:prefer-for-of
                  for (let j = 0; j < this.loginedUser.resultsOfControlWorks.length; j++) {
                    if (this.controlWork[i].id === this.loginedUser.resultsOfControlWorks[j].controlWork.id) {
                      this.canActivateFlag = true;
                      console.log('TESTTETS', this.canActivateFlag);
                      return this.canActivateFlag;
                    }
                  }
              }
            });
          },
          null,
            () => {
              // if (this.canActivateFlag) {
              //   return this.canActivateFlag;
              // } else {
              //   this.router.navigate(['/system/scores'], {
              //     queryParams: {
              //       accessDenied: true
              //     }
              //   });
              //   return false;
              // }
            }
          );

          this.usersService.getUserById(this.loginedUser.id).toPromise().then( (user: User) => {
            if (!this.canActivateFlag) {
              this.router.navigate(['/system/scores'], {
                queryParams: {
                  accessDenied: true
                }
              });
            }
            console.log('return', this.canActivateFlag);
            return this.canActivateFlag;
          });
    }
    console.log('end');
    return this.canActivateFlag;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
