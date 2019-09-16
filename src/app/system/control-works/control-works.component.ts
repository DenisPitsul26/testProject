import {Component, OnDestroy, OnInit} from '@angular/core';
import {ControlWork} from '../../shared/models/controlWork.model';
import {Subscription} from 'rxjs';
import {ControlWorksService} from '../../shared/services/control-works.service';
import {TestsService} from '../../shared/services/tests.service';
import {User} from '../../shared/models/user.model';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';


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
  isAddFormVisible = false;

  constructor(private controlWorksService: ControlWorksService, private testsService: TestsService) {
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
    this.sub1.unsubscribe();
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
    this.sub1 = this.controlWorksService.deleteControlWork(id).subscribe(() => {
      this.getControlWorks();
    });
  }
}
