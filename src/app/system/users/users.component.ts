import {AfterContentInit, Component, OnInit} from '@angular/core';
import {User} from '../../shared/models/User.model';
import {UserService} from '../../auth/user.service';
import {log} from 'util';
import {delay} from 'rxjs/operators';
import {Group} from '../../shared/models/group.model';
import {GroupService} from '../../auth/group.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  groups: string[];
  isLoaded = false;

  constructor(private userService: UserService, private groupService: GroupService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      for (const user of users) {
        this.groupService.getGroupById(user.groupId).subscribe((group: Group) => {
          console.log(group.group);
        });
      }
      this.isLoaded = true;
    });
  }
}
