import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {Subscription} from 'rxjs';
import {UserService} from '../../shared/services/user.service';
import {GroupService} from '../../shared/services/group.service';
import {ActivatedRoute, Params} from '@angular/router';
import {loggedIn} from '@angular/fire/auth-guard';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {mergeMap} from 'rxjs/operators';
import {Group} from '../../shared/models/group.model';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  animations: [fadeStateTrigger]
})
export class UserProfileComponent implements OnInit, OnDestroy {
  isLoaded = false;
  loginedUser: User;
  sub1: Subscription;
  isAddFormVisible = false;
  oldPassword = '';
  newPassword = '';
  errorMessage = '';
  constructor(private usersService: UserService, private groupService: GroupService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
    this.sub1 = this.groupService.getGroupById(this.loginedUser.groupId).subscribe((group1: Group) => {
      this.loginedUser.numberOfGroup = group1.group;
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    this.isLoaded = false;
  }

  changePassword() {
    this.isAddFormVisible = true;
  }
  cancel() {
    this.isAddFormVisible = false;
  }
  savePassword() {
    setTimeout(() => {
      this.errorMessage = '';
      this.oldPassword = (<HTMLInputElement> document.getElementById('userOldPassword')).value;
      this.newPassword = (<HTMLInputElement> document.getElementById('userNewPassword')).value;
      if (this.newPassword === this.oldPassword || this.oldPassword !== this.loginedUser.password) {
        this.errorMessage = 'You have entered wrong current password or passwords are equal';
      } else {
        if (this.newPassword === '' || this.oldPassword === '') {
          this.errorMessage = 'Field must not be empty';
        } else {
          this.loginedUser.password = this.newPassword;
          this.usersService.updateUser(this.loginedUser).subscribe((user: User) => {
            this.cancel();
          });
        }
      }
    }, 1 );
  }
}
