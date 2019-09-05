import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../../shared/models/group.model';
import {GroupService} from '../../auth/group.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {ControlWork} from '../../shared/models/controlWork.model';
import {UserService} from '../../auth/user.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit, OnDestroy {
  isLoaded = false;
  currentGroup: Group;
  sub1: Subscription;
  studentsOfCurrentGroup: User[];

  constructor(private groupsService: GroupService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoaded = false;
    this.sub1 = this.route.params.pipe(mergeMap((params: Params) => this.groupsService.getGroupById(params.id)))
      .subscribe((group: Group) => {
        this.currentGroup = group;
        this.userService.getUsersByGroupId(this.currentGroup.id).subscribe((users: User[]) => {
          this.studentsOfCurrentGroup = users;
          this.studentsOfCurrentGroup.sort((a, b) => (a.name > b.name) ? 1 : -1);
          this.isLoaded = true;
        });
      });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
     this.sub1.unsubscribe();
    }
  }

}
