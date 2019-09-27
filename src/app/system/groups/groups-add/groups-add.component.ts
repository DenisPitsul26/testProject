import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Group} from '../../../shared/models/group.model';
import {Subscription} from 'rxjs';
import {GroupService} from '../../../shared/services/group.service';
import {Message} from '../../../shared/models/message.model';
import {ControlWork} from '../../../shared/models/controlWork.model';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/models/user.model';


@Component({
  selector: 'app-groups-add',
  templateUrl: './groups-add.component.html',
  styleUrls: ['./groups-add.component.css'],
  animations: [fadeStateTrigger]
})
export class GroupsAddComponent implements OnInit, OnDestroy {

  @ViewChild('form', {static: false}) form1: NgForm;
  @Output() addFormIsVisible = new EventEmitter<boolean>();
  @Output() newGroupAdded = new EventEmitter<Group>();
  @Input() currentGroup: Group;
  @Input() groups: Group[];
  loginedUser: User;
  message: Message;
  group: Group;
  sub1: Subscription;
  flag: boolean;
  updatedGroup: Group;
  appointedControlWorks: ControlWork[];
  private updateGroupLength: number;
  private isLoaded = false;
  private isAppointedControlWorksEmpty = true;
  private sub2: Subscription;

  constructor(private groupsService: GroupService, private userService: UserService) { }

  ngOnInit() {
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentGroup !== undefined) {
      setTimeout(() => {
        this.form1.controls.numberOfGroup.setValue(this.currentGroup.group);
        this.form1.controls.faculty.setValue(this.currentGroup.faculty);
        this.appointedControlWorks = JSON.parse(JSON.stringify(this.currentGroup.expectedControlWorks));
        if (this.appointedControlWorks.length > 0) {
          this.isAppointedControlWorksEmpty = false;
        }
      }, 10);
    }
    this.message = new Message('warning', '');
    this.isLoaded = true;
  }

  addUpdateGroup() {
    if (this.currentGroup === undefined) {
      this.flag = false;
      this.group = new Group(this.form1.value.numberOfGroup, this.form1.value.faculty, []);
      for (const group1 of this.groups) {
        if (this.group.group === group1.group) {
          this.flag = true;
        }
      }
      if (!this.flag) {
        this.sub1 = this.groupsService.addGroup(this.group).subscribe((group1) => {
          this.newGroupAdded.emit(group1);
          this.form1.reset();
          this.addFormIsVisible.emit(false);
        });
      } else {
        this.showMessage({
          text: 'This group already exists',
          type: 'warning'
        });
      }
    } else {
      this.flag = false;
      this.group = new Group(this.form1.value.numberOfGroup, this.form1.value.faculty,
        this.appointedControlWorks, this.currentGroup.id);
      for (const group1 of this.groups) {
        if (this.group.group === group1.group) {
          this.flag = true;
        }
      }
      if (!this.flag) {
        this.sub1 = this.groupsService.updateGroup(this.group).subscribe((group1) => {
          this.newGroupAdded.emit(group1);
          this.form1.reset();
          this.addFormIsVisible.emit(false);
        });
        this.sub2 = this.userService.getAllUsers().subscribe((users: User[]) => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < users[i].resultsOfControlWorks.length; j++) {
              let flag = false;
              // tslint:disable-next-line:prefer-for-of
              for (let k = 0; k < this.appointedControlWorks.length; k++) {
                if (users[i].resultsOfControlWorks[j].controlWork.id === this.appointedControlWorks[k].id) {
                  flag = true;
                }
              }
              if (!flag) {
                users[i].resultsOfControlWorks.splice(j, 1);
                this.userService.updateUser(users[i]).subscribe((user: User) => {
                  // console.log('user', user);
                });
              }
            }
          }
        });
      } else {
        this.showMessage({
          text: 'This group already exists',
          type: 'warning'
        });
      }
    }
  }
  cancel() {
    this.form1.reset();
    this.addFormIsVisible.emit(false);
    if (this.currentGroup !== undefined) {
      this.appointedControlWorks = this.currentGroup.expectedControlWorks;
    }
  }

  private showMessage(message: Message) {
    this.message = message;
    setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  delete(idx: number) {
    this.appointedControlWorks.splice(idx, 1);
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
