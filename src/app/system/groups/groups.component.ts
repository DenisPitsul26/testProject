import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../../shared/models/group.model';
import {Subscription} from 'rxjs';
import {GroupService} from '../../shared/services/group.service';
import {group} from '@angular/animations';
import {User} from '../../shared/models/user.model';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  animations: [fadeStateTrigger]
})
export class GroupsComponent implements OnInit, OnDestroy {

  isLoaded = false;
  groups: Group[];
  sub1: Subscription;
  isAddFormVisible = false;
  isAppointFormVisible = false;
  currentGroup: Group;
  loginedUser: User;

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getGroups();
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
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
    this.currentGroup = undefined;
  }

  cancelForm(flag: boolean) {
    this.isAddFormVisible = flag;
  }

  updateGroupForm(group1: Group) {
    this.isAddFormVisible = true;
    this.currentGroup = group1;
  }

  newGroupAdded(group1: Group) {
    this.getGroups();
  }

  deleteGroup(id: number) {
    this.sub1 = this.groupService.deleteGroup(id).subscribe(() => {
      this.getGroups();
    });
  }

  toAppointForm(group1: Group) {
    this.isAppointFormVisible = true;
    this.currentGroup = group1;
  }

  cancelAppointForm(flag: boolean) {
    this.isAppointFormVisible = flag;
  }

  groupAppointed(group1: Group) {
    this.getGroups();
  }
}
