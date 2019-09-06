import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
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
  updateTestsLength: number;
  @Output() addFormIsVisible = new EventEmitter<boolean>();
  @Input() currentControlWork: ControlWork;
  @Output() currentControlUpdated = new EventEmitter<TestModel>();
  constructor(private testsService: TestsService, private controlService: ControlWorksService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.sub1 = this.testsService.getTests().subscribe((tests: TestModel[]) => {
      this.tests = tests;
      this.isLoaded = true;
      this.checkId = this.tests.length;
    });
    setTimeout(() => {
      if (this.currentControlWork === undefined) {

      } else {
        this.updateTestsLength = this.currentControlWork.tests.length;
        this.cwName = this.currentControlWork.theme;
        // this.checkedTests = this.currentControlWork.tests;
        // console.log(this.updateTestsLength);
        // console.log(this.checkId);
        console.log(this.tests);
        console.log(this.currentControlWork.tests);
        setTimeout(() => {
          (document.getElementById('cwName') as HTMLInputElement).value = this.cwName;
          for (let i = 0; i < this.updateTestsLength; i++) {
            for (let j = 0; j < this.checkId; j++) {
              if (this.tests[j].id === this.currentControlWork.tests[i].id) {
                (document.getElementById((j + 1) + 'c') as HTMLInputElement).checked = true;
              }
            }
          }
        }, 1);
      }
    }, 10);
  }
  addTest() {
    setTimeout(() => {
      if (this.currentControlWork === undefined) {
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
      } else {
        for (let i = 1; i <= this.checkId; i++) {
          this.check1 = (<HTMLInputElement> document.getElementById(i + 'c')).checked;
          if (this.check1) {
            this.checkedTests.push(this.tests[i - 1]);
            this.checkedTest = true;
          }
        }
        this.cwName = (<HTMLInputElement> document.getElementById('cwName')).value;
        if (this.cwName !== '' && this.checkedTest) {
          this.controlModel = new ControlWork(this.cwName, this.checkedTests, this.currentControlWork.id);
          this.controlService.updateControl(this.controlModel).subscribe((control: ControlWork) => {
            this.cancel();
          });
        } else {
          alert('something went wrong');
        }
      }
    }, 1);
  }
  cancel() {
    this.addFormIsVisible.emit(false);
  }
}
