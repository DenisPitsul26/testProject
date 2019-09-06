import {Component, OnDestroy, OnInit} from '@angular/core';
import {ControlWork} from '../../shared/models/controlWork.model';
import {Subscription} from 'rxjs';
import {ControlWorksService} from '../../shared/services/controlWorks.service';
import {TestsService} from '../../shared/services/tests.service';

@Component({
  selector: 'app-control-works',
  templateUrl: './control-works.component.html',
  styleUrls: ['./control-works.component.css']
})
export class ControlWorksComponent implements OnInit, OnDestroy {
  isLoaded = false;
  controlWorks: ControlWork[];
  sub1: Subscription;
  conWork: ControlWork;
  isAddFormVisible = false;

  constructor(private controlWorksService: ControlWorksService, private testsService: TestsService) {}

  ngOnInit() {
   this.getControlWorks();
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
    this.isAddFormVisible = true;
    this.getControlWorks();
  }

  cancelForm(flag: boolean) {
    this.getControlWorks();
    this.isAddFormVisible = flag;
  }
}
