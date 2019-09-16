import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {GroupService} from '../../shared/services/group.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../shared/services/user.service';
import {Group} from '../../shared/models/group.model';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
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
