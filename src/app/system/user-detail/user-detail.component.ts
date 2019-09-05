import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {TestModel} from '../../shared/models/test.model';
import {UserService} from '../../auth/user.service';
import {GroupService} from '../../auth/group.service';
import {Group} from '../../shared/models/group.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  isLoaded = false;
  user: User;
  sub1: Subscription;
  loginedUser: User;

  constructor(private usersService: UserService, private groupsService: GroupService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
  }
  getUser() {
    this.isLoaded = false;
    this.sub1 = this.route.params.pipe(mergeMap((params: Params) => this.usersService.getUserById(params.id)))
      .subscribe((user: User) => {
        this.user = user;
        this.groupsService.getGroupById(this.user.groupId).subscribe((group1: Group) => {
          this.user.numberOfGroup = group1.group;
          this.isLoaded = true;
        });
      });
  }
  makeOrDeleteAdmin() {
    this.isLoaded = false;
    if (this.user.isAdmin === 0) {
      this.user.isAdmin = 1;
      this.sub1 = this.usersService.updateUser(this.user).subscribe((user: User) => {
        this.getUser();
      });
    } else if (this.user.isAdmin === 1) {
      this.user.isAdmin = 0;
      this.sub1 = this.usersService.updateUser(this.user).subscribe((user: User) => {
        this.getUser();
      });
    }
  }
  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
