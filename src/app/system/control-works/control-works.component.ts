import {Component, OnDestroy, OnInit} from '@angular/core';
import {ControlWork} from '../../shared/models/controlWork.model';
import {Subscription} from 'rxjs';
import {ControlWorksService} from '../../shared/services/control-works.service';
import {TestsService} from '../../shared/services/tests.service';
import {User} from '../../shared/models/user.model';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {GroupService} from '../../shared/services/group.service';
import {Group} from '../../shared/models/group.model';
import {UserService} from '../../shared/services/user.service';


@Component({
  selector: 'app-control-works',
  templateUrl: './control-works.component.html',
  styleUrls: ['./control-works.component.css'],
  animations: [fadeStateTrigger]
})
export class ControlWorksComponent implements OnInit, OnDestroy {
  isLoaded = false;
  controlWorks: ControlWork[];
  sub1: Subscription;
  conWork: ControlWork;
  loginedUser: User;
  currentControlWork: ControlWork;
  allGroups: Group[];
  isAddFormVisible = false;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  allUsers: User[];
  private sub5: Subscription;

  constructor(private controlWorksService: ControlWorksService,
              private testsService: TestsService,
              private groupsService: GroupService,
              private usersService: UserService) {
  }

  ngOnInit() {
    this.getControlWorks();
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
  }

  getControlWorks() {
    this.isLoaded = false;
    this.sub1 = this.controlWorksService.getControlWorks().subscribe((controlWorks: ControlWork[]) => {
      this.controlWorks = controlWorks;
      this.isLoaded = true;
    });
    this.conWork = new ControlWork('main4');
    this.conWork.tests = Array();
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
    if (this.sub4) {
      this.sub4.unsubscribe();
    }
    if (this.sub5) {
      this.sub5.unsubscribe();
    }
  }

  createControlWork() {
    this.currentControlWork = undefined;
    this.isAddFormVisible = true;
  }

  cancelForm(flag: boolean) {
    this.getControlWorks();
    this.isAddFormVisible = flag;
  }

  updateControlForm(control: ControlWork) {
    this.isAddFormVisible = true;
    this.currentControlWork = control;
    this.getControlWorks();
  }

  currentControlUpdated(controlModel) {
    for (let i = 0; i < this.controlWorks.length; i++) {
      if (this.controlWorks[i].id === controlModel.id) {
        this.controlWorks[i] = controlModel;
      }
    }
  }

  deleteControl(id: number) {
    this.sub2 = this.groupsService.getGroups().subscribe((groups: Group[]) => {
      this.allGroups = groups;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.allGroups.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < this.allGroups[i].expectedControlWorks.length; j++) {
          if (this.allGroups[i].expectedControlWorks[j].id === id) {
            this.allGroups[i].expectedControlWorks.splice(j, 1);
            this.sub3 = this.groupsService.updateGroup(this.allGroups[i]).subscribe( (group1: Group) => {
              console.log(group1);
            });
          }
        }
      }
    });
    this.sub4 = this.usersService.getAllUsers().subscribe((users: User[]) => {
      this.allUsers = users;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.allUsers.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < this.allUsers[i].resultsOfControlWorks.length; j++) {
          if (this.allUsers[i].resultsOfControlWorks[j].controlWork.id === id) {
            this.allUsers[i].resultsOfControlWorks.splice(j, 1);
            this.sub5 = this.usersService.updateUser(this.allUsers[i]).subscribe( (user: User) => {
              console.log(user);
            });
          }
        }
      }
    });
    this.sub1 = this.controlWorksService.deleteControlWork(id).subscribe(() => {
      this.getControlWorks();
    });
  }
}
