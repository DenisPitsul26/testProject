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
  currentTest: TestModel;
  sub1: Subscription;
  sub2: Subscription;
  isAddFormVisible = false;

  constructor(private testsService: TestsService) { }

  ngOnInit() {
    this.getTests();
  }
  getTests() {
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
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  addTestForm() {
    this.isAddFormVisible = true;
    this.currentTest = undefined;
  }

  updateTestForm(test: TestModel) {
    this.isAddFormVisible = true;
    this.currentTest = test;
    this.getTests();
  }

  cancelForm(flag: boolean) {
    this.isAddFormVisible = flag;
    this.getTests();
  }

  newTestAdded(testModel) {
    // console.log('eeeeeeeeeeeeeeeeee', testModel);
    this.tests.push(testModel);
    this.getTests();
  }

  currentTestUpdated(testModel) {
    for (let i = 0; i < this.tests.length; i++) {
      if (this.tests[i].id === testModel.id) {
        this.tests[i] = testModel;
      }
    }
  }

  deleteTest(id: number) {
    this.sub1 = this.testsService.deleteTest(id).subscribe(() => {
      this.getTests();
    });
  }
}
