import {Component, OnDestroy, OnInit} from '@angular/core';
import {ControlWork} from '../../shared/models/controlWork.model';
import {Subscription} from 'rxjs';
import {ControlWorksService} from '../../shared/services/control-works.service';
import {Router} from '@angular/router';
import {User} from '../../shared/models/user.model';
import {GroupService} from '../../shared/services/group.service';
import {Group} from '../../shared/models/group.model';

@Component({
  selector: 'app-choose-control-work',
  templateUrl: './choose-control-work.component.html',
  styleUrls: ['./choose-control-work.component.css']
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

  constructor(private controlWorksService: ControlWorksService, private groupsService: GroupService, private router: Router) { }

  ngOnInit() {
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
    this.getControlWorks();
  }

  getControlWorks() {
    this.isLoaded = false;
    if (this.loginedUser.isAdmin === 0) {
      this.sub1 = this.groupsService.getGroupById(this.loginedUser.groupId).subscribe((group: Group) => {
        this.controlWorks = group.expectedControlWorks;
        if (this.controlWorks.length > 0) {
          this.isExpectedControlWorkEmpty = false;
        }
        this.isLoaded = true;
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
