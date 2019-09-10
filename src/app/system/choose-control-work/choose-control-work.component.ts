import {Component, OnDestroy, OnInit} from '@angular/core';
import {ControlWork} from '../../shared/models/controlWork.model';
import {Subscription} from 'rxjs';
import {ControlWorksService} from '../../shared/services/controlWorks.service';
import {Router} from '@angular/router';

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
  constructor(private controlWorksService: ControlWorksService, private router: Router) { }

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
  logStart(control: ControlWork) {
    this.router.navigate(['/write_control_work', control.id], { queryParams: { topic: control.theme } });
  }
}
