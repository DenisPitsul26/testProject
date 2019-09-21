import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {TestsService} from '../../../shared/services/tests.service';
import {TestModel} from '../../../shared/models/test.model';
import {formatI18nPlaceholderName} from '@angular/compiler/src/render3/view/i18n/util';
import {ControlWorksService} from '../../../shared/services/control-works.service';
import {ControlWork} from '../../../shared/models/controlWork.model';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';
import {OpenQuestionService} from '../../../shared/services/open-question.service';
import {OpenQuestionModel} from '../../../shared/models/open-question.model';


@Component({
  selector: 'app-control-add',
  templateUrl: './control-add.component.html',
  styleUrls: ['./control-add.component.css'],
  animations: [fadeStateTrigger]
})
export class ControlAddComponent implements OnInit {
  isLoaded = false;
  searchText: string;
  testName: string[] = [];
  testNameText: string;
  tests: TestModel[];
  questions: OpenQuestionModel[];
  checkedTests: TestModel[] = [];
  checkedQuestions: OpenQuestionModel[] = [];
  controlModel: ControlWork;
  sub1: Subscription;
  sub2: Subscription;
  check: boolean[] = [];
  check1: boolean;
  check1q: boolean;
  checkId: number;
  checkIdq: number;
  questionLength: number;
  checkedTest = false;
  checkedQuestion = false;
  cwName = '';
  updateTestsLength: number;
  updateQuestionsLength: number;
  @Output() addFormIsVisible = new EventEmitter<boolean>();
  @Input() currentControlWork: ControlWork;
  @Output() currentControlUpdated = new EventEmitter<TestModel>();
  private executionTime: number;
  constructor(private testsService: TestsService, private controlService: ControlWorksService, private questionService: OpenQuestionService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.sub1 = this.testsService.getTests().subscribe((tests: TestModel[]) => {
      this.tests = tests;
      this.checkId = this.tests.length;
    });
    this.sub2 = this.questionService.getQuestions().subscribe( (question: OpenQuestionModel[]) => {
      this.questions = question;
      this.questionLength = question.length;
    });
    setTimeout(() => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.checkId; i++) {
        this.testNameText = this.tests[i].question;
        console.log(this.testNameText + ' ');
        this.testName.push(this.testNameText);
      }
      if (this.currentControlWork !== undefined) {
        this.updateTestsLength = this.currentControlWork.tests.length;
        this.updateQuestionsLength = this.currentControlWork.questions.length;
        this.cwName = this.currentControlWork.theme;
        this.executionTime = this.currentControlWork.executionTime;
        // this.checkedTests = this.currentControlWork.tests;
        // console.log(this.updateTestsLength);
        // console.log(this.checkId);
        console.log(this.tests);
        console.log(this.currentControlWork.tests);
        setTimeout(() => {
          (document.getElementById('cwName') as HTMLInputElement).value = this.cwName;
          (document.getElementById('executionTime') as HTMLInputElement).value = String(this.executionTime);
          for (let i = 0; i < this.updateTestsLength; i++) {
            for (let j = 0; j < this.checkId; j++) {
              if (this.tests[j].id === this.currentControlWork.tests[i].id) {
                (document.getElementById((j + 1) + 'c') as HTMLInputElement).checked = true;
              }
            }
          }
          for (let i = 0; i < this.updateQuestionsLength; i++) {
            for (let j = 0; j < this.questionLength; j++) {
              if (this.questions[j].id === this.currentControlWork.questions[i].id) {
                (document.getElementById((j + 1) + 'q') as HTMLInputElement).checked = true;
              }
            }
          }
        }, 1);
      }
      this.isLoaded = true;
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
        for (let i = 1; i <= this.questionLength; i++) {
          this.check1q = (<HTMLInputElement> document.getElementById(i + 'q')).checked;
          if (this.check1q) {
            this.checkedQuestions.push(this.questions[i - 1]);
            this.checkedQuestion = true;
          }
        }
        this.cwName = (<HTMLInputElement> document.getElementById('cwName')).value;
        this.executionTime = +(<HTMLInputElement> document.getElementById('executionTime')).value;
        if (this.executionTime < 0) {
          this.executionTime *= -1;
        }
        if (this.cwName !== '' && this.checkedTest) {
          this.controlModel = new ControlWork(this.cwName, this.checkedTests, this.checkedQuestions, this.executionTime);
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
        for (let i = 1; i <= this.questionLength; i++) {
          this.check1q = (<HTMLInputElement> document.getElementById(i + 'q')).checked;
          if (this.check1q) {
            this.checkedQuestions.push(this.questions[i - 1]);
            this.checkedQuestion = true;
          }
        }
        this.cwName = (<HTMLInputElement> document.getElementById('cwName')).value;
        this.executionTime = +(<HTMLInputElement> document.getElementById('executionTime')).value;
        if (this.executionTime < 0) {
          this.executionTime *= -1;
        }
        if (this.cwName !== '' && this.checkedTest) {
          this.controlModel = new ControlWork(
            this.cwName, this.checkedTests, this.checkedQuestions, this.executionTime, this.currentControlWork.id
          );
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
