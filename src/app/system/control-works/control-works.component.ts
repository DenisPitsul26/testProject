import {Component, OnDestroy, OnInit} from '@angular/core';
import {ControlWork} from '../../shared/models/controlWork.model';
import {Subscription} from 'rxjs';
import {ControlWorksService} from '../../shared/services/controlWorks.service';

@Component({
  selector: 'app-control-works',
  templateUrl: './control-works.component.html',
  styleUrls: ['./control-works.component.css']
})
export class ControlWorksComponent implements OnInit, OnDestroy {
  isLoaded = false;
  controlWorks: ControlWork[];
  sub1: Subscription;

  constructor(private controlWorksService: ControlWorksService) {}

  ngOnInit() {
    this.isLoaded = false;
    this.sub1 = this.controlWorksService.getControlWorks().subscribe((controlWorks: ControlWork[]) => {
      this.controlWorks = controlWorks;
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }



}
