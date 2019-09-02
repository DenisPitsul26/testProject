import {Component, OnDestroy, OnInit} from '@angular/core';
import {TestModel} from '../../shared/models/test.model';
import {Subscription} from 'rxjs';
import {TestsService} from '../../shared/services/tests.service';
import {ActivatedRoute, Params} from '@angular/router';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-testing-detail',
  templateUrl: './testing-detail.component.html',
  styleUrls: ['./testing-detail.component.css']
})
export class TestingDetailComponent implements OnInit, OnDestroy {
  isLoaded = false;
  testModel: TestModel;
  sub1: Subscription;

  constructor(private testsService: TestsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoaded = false;
    this.route.params.pipe(mergeMap((params: Params) => this.testsService.getTestById(params.id)))
      .subscribe((test: TestModel) => {
        this.testModel = test;
        this.isLoaded = true;
      });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
