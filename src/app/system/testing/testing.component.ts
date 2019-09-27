import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TestsService} from '../../shared/services/tests.service';
import {TestModel} from '../../shared/models/test.model';
import {ControlWorksService} from '../../shared/services/control-works.service';
import {ControlWork} from '../../shared/models/controlWork.model';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';


@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css'],
  animations: [fadeStateTrigger]
})
export class TestingComponent implements OnInit, OnDestroy {
  isLoaded = false;
  tests: TestModel[];
  currentTest: TestModel;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  controls: ControlWork[];
  isAddFormVisible = false;
  isDeleteAvailable = false;
  modal: any;
  modalAdd: any;
  temp: number;

  constructor(private testsService: TestsService, private controlWorksService: ControlWorksService) { }

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
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
  }

  addTestForm() {
    this.currentTest = undefined;
    this.isAddFormVisible = true;
    this.modalAdd = (document.getElementById('myModalAdd') as HTMLDivElement);
    this.modalAdd.style.display = 'block';
  }

  cancelForm(flag: boolean) {
    this.modalAdd.style.display = 'none';
    this.isAddFormVisible = flag;
  }

  updateTestForm(test: TestModel) {
    this.isAddFormVisible = true;
    this.currentTest = test;
    this.modalAdd = (document.getElementById('myModalAdd') as HTMLDialogElement);
    this.modalAdd.style.display = 'block';
    // this.getTests();
  }
  newTestAdded(testModel: TestModel) {
    this.getTests();
    this.modalAdd.style.display = 'none';
  }

  // currentTestUpdated(testModel) {
  //   for (let i = 0; i < this.tests.length; i++) {
  //     if (this.tests[i].id === testModel.id) {
  //       this.tests[i] = testModel;
  //     }
  //   }
  // }

  deleteTest(id: number) {
    this.modal = (document.getElementById('myModal') as HTMLDivElement);
    this.modal.style.display = 'block';
    this.temp = id;
    this.isDeleteAvailable = true;
  }
  confirmDialog() {
    this.sub2 = this.controlWorksService.getControlWorks().subscribe((controlWorks: ControlWork[]) => {
      this.controls = controlWorks;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.controls.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < this.controls[i].tests.length; j++) {
          if (this.controls[i].tests[j].id === this.temp) {
            this.controls[i].tests.splice(j, 1);
            this.sub3 = this.controlWorksService.updateControl(this.controls[i]).subscribe( (control: ControlWork) => {
              console.log(control);
            });
          }
        }
      }
    });
    this.sub1 = this.testsService.deleteTest(this.temp).subscribe(() => {
      this.getTests();
    });
    this.modal.style.display = 'none';
    this.isDeleteAvailable = false;
  }
  cancelDialog() {
    this.modal.style.display = 'none';
    this.isDeleteAvailable = false;
  }
}
