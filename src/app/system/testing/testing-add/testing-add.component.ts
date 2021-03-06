import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {TestsService} from '../../../shared/services/tests.service';
import {TestModel} from '../../../shared/models/test.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ControlWorksService} from '../../../shared/services/control-works.service';
import {ControlWork} from '../../../shared/models/controlWork.model';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';


@Component({
  selector: 'app-testing-add',
  templateUrl: './testing-add.component.html',
  styleUrls: ['./testing-add.component.css'],
  animations: [fadeStateTrigger]
})
export class TestingAddComponent implements OnInit, OnDestroy {
  count = 1;
  answers: string[] = [];
  correctAnswers: number[] = [];
  answer = '';
  correctAnswer = false;
  controlWorks: ControlWork[];
  sub1: Subscription;
  @Output() addFormIsVisible = new EventEmitter<boolean>();
  @Output() newTestAdded = new EventEmitter<TestModel>();
  // @Output() currentTestUpdated = new EventEmitter<TestModel>();
  question = '';
  testModel: TestModel;
  @Input() currentTest: TestModel;

  constructor(private testsService: TestsService, private controlWorkService: ControlWorksService) { }

  ngOnInit() {
    if (this.currentTest === undefined) {
      console.log('add', this.currentTest);
      this.count = 1;
    } else {
      console.log('update', this.currentTest);
      this.count = this.currentTest.answers.length;
      setTimeout(() => {
        (document.getElementById('question') as HTMLInputElement).value = this.currentTest.question;
        for (let i = 1; i <= this.count; i++) {
          (<HTMLInputElement> document.getElementById(String(i))).value = this.currentTest.answers[i - 1];
        }
        for (let i = 1; i <= this.currentTest.correctAnswers.length; i++) {
          (<HTMLInputElement> document.getElementById(this.currentTest.correctAnswers[i - 1] + 'c')).checked = true;
        }
      }, 1);
    }
  }

  addAnswer() {
    this.count++;
  }

  deleteAnswer() {
    if (this.count > 1) {
      this.count--;
    }
  }

  addUpdateTest() {
    if (this.currentTest === undefined) {
      this.addTest();
    } else {
      this.updateTest();
    }
  }
  addTest() {
    this.question = (document.getElementById('question') as HTMLInputElement).value;
    for (let i = 1; i <= this.count; i++) {
      this.answer = (document.getElementById(String(i)) as HTMLInputElement).value;
      this.correctAnswer = (document.getElementById(i + 'c') as HTMLInputElement).checked;
      this.answers.push(this.answer);
      if (this.correctAnswer) {
        this.correctAnswers.push(i);
      }
    }
    if (this.answers && this.correctAnswers && this.question) {
      this.testModel = new TestModel(this.question, this.answers, this.correctAnswers);
      this.sub1 = this.testsService.addTest(this.testModel).subscribe((test: TestModel) => {
        this.newTestAdded.emit(test);
        this.addFormIsVisible.emit(false);
      });
    }
    this.answers = [];
    this.correctAnswers = [];
    // this.addFormIsVisible.emit(false);
    console.log('done');
  }
  updateTest() {
    this.question = (document.getElementById('question') as HTMLInputElement).value;
    for (let i = 1; i <= this.count; i++) {
      this.answer = (document.getElementById(String(i)) as HTMLInputElement).value;
      this.correctAnswer = (document.getElementById(i + 'c') as HTMLInputElement).checked;
      this.answers.push(this.answer);
      if (this.correctAnswer) {
        this.correctAnswers.push(i);
      }
    }
    if (this.answers && this.correctAnswers && this.question) {
      this.testModel = new TestModel(this.question, this.answers, this.correctAnswers, this.currentTest.id);
      this.sub1 = this.testsService.updateTest(this.testModel).subscribe((test: TestModel) => {
        this.controlWorkService.getControlWorks().subscribe((controls: ControlWork[]) => {
          this.controlWorks = controls;
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.controlWorks.length; i++) {
            for (let j = 0; j < this.controlWorks[i].tests.length; j++) {
              if (this.controlWorks[i].tests[j].id === test.id) {
                this.controlWorks[i].tests[j] = test;
              }
            }
            this.controlWorkService.updateControl(this.controlWorks[i]).subscribe((control: ControlWork) => {
              this.newTestAdded.emit(test);
              this.addFormIsVisible.emit(false);
            });
          }
        });
      });
    }
    this.answers = [];
    this.correctAnswers = [];
    // this.addFormIsVisible.emit(false);
    console.log('done');
  }

  cancel() {
    this.addFormIsVisible.emit(false);
    this.currentTest = undefined;
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
