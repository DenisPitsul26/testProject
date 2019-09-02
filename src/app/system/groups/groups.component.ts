import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../../shared/models/group.model';
import {Subscription} from 'rxjs';
import {GroupService} from '../../auth/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, OnDestroy {

  isLoaded = false;
  groups: Group[];
  sub1: Subscription;

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.sub1 = this.groupService.getGroups().subscribe((groups: Group[]) => {
      this.groups = groups;
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
