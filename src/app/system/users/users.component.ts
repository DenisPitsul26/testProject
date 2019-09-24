import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {UserService} from '../../shared/services/user.service';
import {log} from 'util';
import {Group} from '../../shared/models/group.model';
import {GroupService} from '../../shared/services/group.service';
import {combineLatest, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {ControlWork} from '../../shared/models/controlWork.model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [fadeStateTrigger]
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[];
  groups: Group[];
  isLoaded = false;
  sub1: Subscription;
  loginedUser: User;
  currentUser: User;
  isUpdateFormVisible = false;
  modal: any;
  modalAdd: any;
  temp: number;

  constructor(private userService: UserService, private groupService: GroupService, private router: Router) { }

  ngOnInit() {
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
    if (this.loginedUser.isAdmin === 0) {
      console.log('student');
      this.router.navigate(['/system', 'choose_control_work']);
    }
    this.isLoaded = false;
    this.getUsers();
  }

  getUsers() {
    this.sub1 = combineLatest(
      this.userService.getAllUsers(),
      this.groupService.getGroups()
    ).subscribe((data: [User[], Group[]]) => {
      this.users = data[0];
      this.groups = data[1];
      if (this.groups !== undefined || this.users !== undefined) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.users.length; i++) {
          // tslint:disable-next-line:prefer-for-of
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
    this.modalAdd.style.display = 'none';
  }

  updateUserForm(user: User) {
    this.isUpdateFormVisible = true;
    this.currentUser = user;
    this.modalAdd = (document.getElementById('myModalAdd') as HTMLDialogElement);
    this.modalAdd.style.display = 'block';
  }

  deleteUser(id: number) {
    this.modal = (document.getElementById('myModal') as HTMLDivElement);
    this.modal.style.display = 'block';
    this.temp = id;
  }
  confirmDialog() {
    this.sub1 = this.userService.deleteUser(this.temp).subscribe((user: User) => {
      this.getUsers();
    });
    this.modal.style.display = 'none';
  }
  cancelDialog() {
    this.modal.style.display = 'none';
  }

  userUpdated(user: User) {
    this.getUsers();
    this.modalAdd.style.display = 'none';
  }

  cancelForm(flag: boolean) {
    this.isUpdateFormVisible = flag;
    this.modalAdd.style.display = 'none';
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
