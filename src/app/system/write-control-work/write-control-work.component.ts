import { Component, OnInit } from '@angular/core';
import {ControlWork} from '../../shared/models/controlWork.model';
import {ControlWorksService} from '../../shared/services/controlWorks.service';
import {Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {User} from '../../shared/models/user.model';
import {Group} from '../../shared/models/group.model';

@Component({
  selector: 'app-write-control-work',
  templateUrl: './write-control-work.component.html',
  styleUrls: ['./write-control-work.component.css']
})
export class WriteControlWorkComponent implements OnInit {
  currentControlWork: ControlWork;
  numberOfTests: number;
  answers: string[];
  question: string;
  count = 0;
  sub1: Subscription;
  isLoaded = false;
  maxScore = 0;
  userScore = 0;
  completedTest = false;
  userAnswer: boolean;
  userAnswers = [];
  required = false;
  counter: number;
  switchBtn = false;

  constructor(private controlWorkService: ControlWorksService, private route: ActivatedRoute) { }



  ngOnInit() {
    this.isLoaded = false;
    this.completedTest = false;
    this.sub1 = this.route.params.pipe(mergeMap((params: Params) => this.controlWorkService.getControlWorkById(params.id)))
      .subscribe((controlWork: ControlWork) => {
        this.currentControlWork = controlWork;
        this.numberOfTests = this.currentControlWork.tests.length;
        this.question = this.currentControlWork.tests[this.count].question;
        this.answers = this.currentControlWork.tests[this.count].answers;
        this.isLoaded = true;
        // document.getElementById('answer');
        this.userAnswers = new Array(this.numberOfTests);
        for (let i = 0; i < this.numberOfTests; i++) {
          this.userAnswers[i] = new Array(this.currentControlWork.tests[i].answers.length);
          for (let j = 0; j < this.currentControlWork.tests[i].answers.length; j++) {
            this.userAnswers[i][j] = false;
          }
          // tslint:disable-next-line:prefer-for-of
          for (let j = 0; j < this.currentControlWork.tests[i].correctAnswers.length; j++) {
            this.maxScore++;
          }
        }
        console.log(this.maxScore);
      });
  }

  Ok() {
    this.saveAnswer();
    if ((this.count + 1) < this.currentControlWork.tests.length) {
      this.count++;
      this.loadQuestion();
    } else {
      this.completeTest();
    }
  }
  loadQuestion() {
    this.question = this.currentControlWork.tests[this.count].question;
    this.answers = this.currentControlWork.tests[this.count].answers;
    this.required = false;
    setTimeout(() => {
      for (let i = 1; i <= this.currentControlWork.tests[this.count].answers.length; i++) {
        (document.getElementById(String(i)) as HTMLInputElement).checked = this.userAnswers[this.count][i - 1];
        if (this.userAnswers[this.count][i - 1]) {
          this.required = true;
        }
      }
    }, 10);
  }
  saveAnswer() {
    for (let i = 1; i <= this.currentControlWork.tests[this.count].answers.length; i++) {
      this.userAnswer = (document.getElementById(String(i)) as HTMLInputElement).checked;
      this.userAnswers[this.count][i - 1] = this.userAnswer;
    }
  }
  changeQuestion(number1: number) {
    this.saveAnswer();
    this.count = number1;
    this.loadQuestion();
  }
  completeTest() {
    this.saveAnswer();
    this.completedTest = true;
    console.log(this.userAnswers);
    for (let i = 0; i < this.userAnswers.length; i++) {
      for (let j = 0; j < this.userAnswers.length; j++) {
        if (this.userAnswers[i][j]) {
          // tslint:disable-next-line:prefer-for-of
          for (let z = 0; z < this.currentControlWork.tests[i].correctAnswers.length; z++) {
            if (this.currentControlWork.tests[i].correctAnswers[z] === (j + 1)) {
              this.userScore++;
            }
          }
        }
      }
    }

    console.log(this.userScore);
  }

  onTestChecked($event: Event) {
    this.counter = 0;
    this.switchBtn = false;
    this.required = false;
    for (let i = 1; i <= this.currentControlWork.tests[this.count].answers.length; i++) {
      if ((document.getElementById(String(i)) as HTMLInputElement).checked) {
        this.required = true;
        this.counter++;
        this.switchBtn = false;
      }
      if (this.currentControlWork.tests[this.count].correctAnswers.length <= this.counter - 1) {
        this.required = false;
        this.switchBtn = true;
      }
    }
  }
}
