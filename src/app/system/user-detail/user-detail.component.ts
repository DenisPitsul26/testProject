import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';
import {TestModel} from '../../shared/models/test.model';
import {UserService} from '../../shared/services/user.service';
import {GroupService} from '../../shared/services/group.service';
import {Group} from '../../shared/models/group.model';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  animations: [fadeStateTrigger]
})
export class UserDetailComponent implements OnInit, OnDestroy {
  isLoaded = false;
  user: User;
  sub1: Subscription;
  loginedUser: User;
  private role: string;

  constructor(private usersService: UserService, private groupsService: GroupService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoaded = false;
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
    this.getUser();
  }
  getUser() {
    this.isLoaded = false;
    this.sub1 = this.route.params.pipe(mergeMap((params: Params) => this.usersService.getUserById(params.id)))
      .subscribe((user: User) => {
        this.user = user;
        if (this.user.isAdmin === 1) {
          this.role = 'admin';
        } else if (this.user.isAdmin === 2) {
          this.role = 'teacher';
        } else {
          this.role = 'student';
        }
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
      this.sub1 = this.usersService.updateUser({
        email: this.user.email,
        password: this.user.password,
        name: this.user.name,
        isAdmin: this.user.isAdmin,
        groupId: this.user.groupId,
        id: this.user.id
      }).subscribe((user: User) => {
        this.getUser();
      });
    } else if (this.user.isAdmin === 1) {
      this.user.isAdmin = 0;
      this.sub1 = this.usersService.updateUser({
        email: this.user.email,
        password: this.user.password,
        name: this.user.name,
        isAdmin: this.user.isAdmin,
        groupId: this.user.groupId,
        id: this.user.id
      }).subscribe((user: User) => {
        this.getUser();
      });
    }
  }
  makeOrDeleteTeacher() {
    this.isLoaded = false;
    if (this.user.isAdmin === 0) {
      this.user.isAdmin = 2;
      this.sub1 = this.usersService.updateUser({
        email: this.user.email,
        password: this.user.password,
        name: this.user.name,
        isAdmin: this.user.isAdmin,
        groupId: this.user.groupId,
        id: this.user.id
      }).subscribe((user: User) => {
        this.getUser();
      });
    } else if (this.user.isAdmin === 2) {
      this.user.isAdmin = 0;
      this.sub1 = this.usersService.updateUser({
        email: this.user.email,
        password: this.user.password,
        name: this.user.name,
        isAdmin: this.user.isAdmin,
        groupId: this.user.groupId,
        id: this.user.id
      }).subscribe((user: User) => {
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
