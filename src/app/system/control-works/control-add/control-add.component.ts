import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {TestsService} from '../../../shared/services/tests.service';
import {TestModel} from '../../../shared/models/test.model';
import {formatI18nPlaceholderName} from '@angular/compiler/src/render3/view/i18n/util';
import {ControlWorksService} from '../../../shared/services/controlWorks.service';
import {ControlWork} from '../../../shared/models/controlWork.model';

@Component({
  selector: 'app-control-add',
  templateUrl: './control-add.component.html',
  styleUrls: ['./control-add.component.css']
})
export class ControlAddComponent implements OnInit {
  isLoaded = false;
  tests: TestModel[];
  checkedTests: TestModel[] = [];
  controlModel: ControlWork;
  sub1: Subscription;
  check: boolean[] = [];
  check1: boolean;
  checkId: number;
  checkedTest = false;
  cwName = '';
  @Output() addFormIsVisible = new EventEmitter<boolean>();
  constructor(private testsService: TestsService, private controlService: ControlWorksService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.sub1 = this.testsService.getTests().subscribe((tests: TestModel[]) => {
      this.tests = tests;
      this.isLoaded = true;
      this.checkId = this.tests.length;
    });
  }
  addTest() {
    setTimeout(() => {
      for (let i = 1; i <= this.checkId; i++) {
        this.check1 = (<HTMLInputElement> document.getElementById(i + 'c')).checked;
        if (this.check1) {
          this.checkedTests.push(this.tests[i - 1]);
          this.checkedTest = true;
        }
      }
      this.cwName = (<HTMLInputElement> document.getElementById('cwName')).value;
      if (this.cwName !== '' && this.checkedTest) {
        this.controlModel = new ControlWork(this.cwName, this.checkedTests);
        this.controlService.addControlWork(this.controlModel).subscribe((control: ControlWork) => {
          this.cancel();
        });
      } else {
        alert('something went wrong');
      }
    }, 1);
  }
  cancel() {
    this.addFormIsVisible.emit(false);
  }
}
