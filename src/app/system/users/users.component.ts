import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {UserService} from '../../auth/user.service';
import {log} from 'util';
import {Group} from '../../shared/models/group.model';
import {GroupService} from '../../auth/group.service';
import {combineLatest, Subscription} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[];
  groups: Group[];
  isLoaded = false;
  sub1: Subscription;

  constructor(private userService: UserService, private groupService: GroupService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.sub1 = combineLatest(
      this.userService.getAllUsers(),
      this.groupService.getGroups()
    ).subscribe((data: [User[], Group[]]) => {
      this.users = data[0];
      this.groups = data[1];
      if (this.groups !== undefined || this.users !== undefined) {
        for (let i = 0; i < this.users.length; i++) {
          for (let j = 0; j < this.groups.length; j++) {
            if (this.users[i].groupId === this.groups[j].id) {
              this.users[i].numberOfGroup = this.groups[j].group;
              break;
            }
          }
        }
      }
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
