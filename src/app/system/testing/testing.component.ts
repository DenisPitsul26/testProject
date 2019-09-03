import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TestsService} from '../../shared/services/tests.service';
import {TestModel} from '../../shared/models/test.model';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit, OnDestroy {
  isLoaded = false;
  tests: TestModel[];
  sub1: Subscription;
  isAddFormVisible = false;

  constructor(private testsService: TestsService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.sub1 = this.testsService.getTests().subscribe((tests: TestModel[]) => {
      this.tests = tests;
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  addTestForm() {
    this.isAddFormVisible = true;
    console.log(this.isAddFormVisible);
  }

  cancelForm(flag: boolean) {
    this.isAddFormVisible = flag;
  }

  newTestAdded(testModel) {
    console.log('eeeeeeeeeeeeeeeeee', testModel);
    this.tests.push(testModel);
  }
}
