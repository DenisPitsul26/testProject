import {Component, OnDestroy, OnInit} from '@angular/core';
import {ControlWork} from '../../shared/models/controlWork.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {ControlWorksService} from '../../shared/services/control-works.service';

@Component({
  selector: 'app-control-work-detail',
  templateUrl: './control-work-detail.component.html',
  styleUrls: ['./control-work-detail.component.css']
})
export class ControlWorkDetailComponent implements OnInit, OnDestroy {
  isLoaded = false;
  controlWork: ControlWork;
  sub1: Subscription;

  constructor(private controlWorksService: ControlWorksService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoaded = false;
    this.sub1 = this.route.params.pipe(mergeMap((params: Params) => this.controlWorksService.getControlWorkById(params.id)))
      .subscribe((controlWork: ControlWork) => {
        this.controlWork = controlWork;
        this.isLoaded = true;
      });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
