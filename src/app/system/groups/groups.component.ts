import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../../shared/models/group.model';
import {Subscription} from 'rxjs';
import {GroupService} from '../../auth/group.service';
import {group} from '@angular/animations';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, OnDestroy {

  isLoaded = false;
  groups: Group[];
  sub1: Subscription;
  isAddFormVisible = false;
  currentGroup: Group;

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getGroups();
  }
  getGroups() {
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

  addGroupForm() {
    this.isAddFormVisible = true;
  }

  cancelForm(flag: boolean) {
    this.isAddFormVisible = flag;
  }

  newGroupAdded(group1: Group) {
    this.getGroups();
  }

  updateGroupForm(group1: Group) {
    this.isAddFormVisible = true;
    this.currentGroup = group1;
    this.getGroups();
  }

  deleteGroup(id: number) {
    this.sub1 = this.groupService.deleteGroup(id).subscribe(() => {
      this.getGroups();
    });
  }
}
