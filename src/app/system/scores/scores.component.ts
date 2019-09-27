import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {GroupService} from '../../shared/services/group.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../shared/services/user.service';
import {Group} from '../../shared/models/group.model';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';


@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css'],
  animations: [fadeStateTrigger]
})
export class ScoresComponent implements OnInit, OnDestroy {
  isLoaded = false;
  loginedUser: User;
  groupOfLoginedUser: Group;
  groups: Group[];
  sub1: Subscription;

  constructor(private groupService: GroupService, private userService: UserService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
    if (this.loginedUser.isAdmin === 1 || this.loginedUser.isAdmin === 2) {
      this.sub1 = this.groupService.getGroups().subscribe((groups1: Group[]) => {
        this.groups = groups1;
        for (let i = 0; i < this.groups.length; i++) {
          if (this.groups[i].group === 'Teachers') {
            this.groups.splice(i, 1);
          }
        }
        for (let i = 0; i < this.groups.length; i++) {
          if (this.groups[i].group === 'Admins') {
            this.groups.splice(i, 1);
          }
        }
        this.isLoaded = true;
      });
    } else {
      this.sub1 = this.groupService.getGroupById(this.loginedUser.groupId).subscribe((group1: Group) => {
        this.groups = [];
        this.groups.push(group1);
        this.isLoaded = true;
      });
    }
  }
  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
