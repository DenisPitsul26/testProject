import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../../shared/models/group.model';
import {Subscription} from 'rxjs';
import {GroupService} from '../../shared/services/group.service';
import {group} from '@angular/animations';
import {User} from '../../shared/models/user.model';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {UserService} from '../../shared/services/user.service';


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
  modal: any;
  modalF: any;
  modalAdd: any;
  modalAddApp: any;
  temp: number;
  isDeleteAvailable = false;
  private sub2: Subscription;
  private studentsOfCurrentGroup: User[];
  constructor(private groupService: GroupService, private userService: UserService) { }

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
    this.modalAdd = (document.getElementById('myModalAdd') as HTMLDivElement);
    this.modalAdd.style.display = 'block';
  }

  cancelForm(flag: boolean) {
    this.isAddFormVisible = flag;
    this.modalAdd.style.display = 'none';
  }

  updateGroupForm(group1: Group) {
    this.isAddFormVisible = true;
    this.currentGroup = group1;
    this.modalAdd = (document.getElementById('myModalAdd') as HTMLDialogElement);
    this.modalAdd.style.display = 'block';
  }

  newGroupAdded(group1: Group) {
    this.getGroups();
    this.modalAdd.style.display = 'none';
  }
  confirmDialog() {
    this.sub1 = this.groupService.deleteGroup(this.temp).subscribe(() => {
      this.getGroups();
    });
    this.modal.style.display = 'none';
    this.isDeleteAvailable = false;
  }
  cancelDialog() {
    this.modal.style.display = 'none';
    this.isDeleteAvailable = false;
  }
  cancelDialogF() {
    this.modalF.style.display = 'none';
    this.isDeleteAvailable = false;
  }
  deleteGroup(id: number) {
    this.sub2 = this.userService.getUsersByGroupId(id).subscribe((users: User[]) => {
      this.studentsOfCurrentGroup = users;
      this.modal = (document.getElementById('myModal') as HTMLDivElement);
      if (users.length > 0) {
        this.modal = (document.getElementById('myModal') as HTMLDivElement);
        this.modal.style.display = 'block';
        this.temp = id;
        this.isDeleteAvailable = true;
      } else {
        this.modalF = (document.getElementById('myModal1Forbidden') as HTMLDivElement);
        this.modalF.style.display = 'block';
        this.temp = id;
        this.isDeleteAvailable = true;
      }
    });
  }

  toAppointForm(group1: Group) {
    this.isAppointFormVisible = true;
    this.currentGroup = group1;
    this.modalAddApp = (document.getElementById('myModalAddApp') as HTMLDivElement);
    this.modalAddApp.style.display = 'block';
  }

  cancelAppointForm(flag: boolean) {
    this.isAppointFormVisible = flag;
    this.modalAddApp.style.display = 'none';
  }

  groupAppointed(group1: Group) {
    this.getGroups();
    this.modalAddApp.style.display = 'none';
  }
}
