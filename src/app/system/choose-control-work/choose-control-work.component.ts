import {Component, OnDestroy, OnInit} from '@angular/core';
import {ControlWork} from '../../shared/models/controlWork.model';
import {Subscription} from 'rxjs';
import {ControlWorksService} from '../../shared/services/control-works.service';
import {Router} from '@angular/router';
import {User} from '../../shared/models/user.model';
import {GroupService} from '../../shared/services/group.service';
import {Group} from '../../shared/models/group.model';
import {UserService} from '../../shared/services/user.service';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';


@Component({
  selector: 'app-choose-control-work',
  templateUrl: './choose-control-work.component.html',
  styleUrls: ['./choose-control-work.component.css'],
  animations: [fadeStateTrigger]
})
export class ChooseControlWorkComponent implements OnInit, OnDestroy {
  isLoaded = false;
  controlWorks: ControlWork[];
  sub1: Subscription;
  conWork: ControlWork;
  currentControlWork: ControlWork;
  isAddFormVisible = false;
  private loginedUser: User;
  isExpectedControlWorkEmpty = true;

  constructor(private controlWorksService: ControlWorksService,
              private groupsService: GroupService,
              private usersService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
    this.getControlWorks();
  }

  getControlWorks() {
    this.isLoaded = false;
    if (this.loginedUser.isAdmin === 0) {
      this.usersService.getUserById(this.loginedUser.id).subscribe((user: User) => {
        this.loginedUser = user;
        this.sub1 = this.groupsService.getGroupById(this.loginedUser.groupId).subscribe((group: Group) => {
          this.controlWorks = group.expectedControlWorks;
          if (this.loginedUser.resultsOfControlWorks.length > 0) {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.controlWorks.length; i++) {
              // tslint:disable-next-line:prefer-for-of
              for (let j = 0; j < this.loginedUser.resultsOfControlWorks.length; j++) {
                if (this.controlWorks[i].id === this.loginedUser.resultsOfControlWorks[j].controlWork.id) {
                  this.controlWorks.splice(i, 1);
                }
              }
            }
            console.log('rrr: ', this.loginedUser);
            console.log('ccc: ', this.controlWorks);
          }
          if (this.controlWorks.length > 0) {
            this.isExpectedControlWorkEmpty = false;
          }
          this.isLoaded = true;
        });
      });
    } else if (this.loginedUser.isAdmin === 1) {
      this.sub1 = this.controlWorksService.getControlWorks().subscribe((controlWorks: ControlWork[]) => {
        this.controlWorks = controlWorks;
        this.isExpectedControlWorkEmpty = false;
        this.isLoaded = true;
      });
    }
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }
  start(control: ControlWork) {
    this.router.navigate(['/write_control_work', control.id], { queryParams: { topic: control.theme } });
  }
}
