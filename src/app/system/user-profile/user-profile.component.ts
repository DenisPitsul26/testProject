import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {Subscription} from 'rxjs';
import {UserService} from '../../shared/services/user.service';
import {GroupService} from '../../shared/services/group.service';
import {ActivatedRoute} from '@angular/router';
import {loggedIn} from '@angular/fire/auth-guard';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  isLoaded = false;
  loginedUser: User;
  sub1: Subscription;
  isAddFormVisible = false;
  oldPassword = '';
  newPassword = '';
  errorMessage = '';
  constructor(private usersService: UserService) { }

  ngOnInit() {
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
    this.isLoaded = true;
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
