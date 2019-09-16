import { Component, OnInit } from '@angular/core';
import {ControlWork} from '../../shared/models/controlWork.model';
import {ControlWorksService} from '../../shared/services/control-works.service';
import {Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../../shared/models/user.model';
import {Group} from '../../shared/models/group.model';
import {ResultOfControlWork} from '../../shared/models/result-of-control-work';
import {UserService} from '../../shared/services/user.service';
import {log} from 'util';

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
  updatedUser: User;
  private loginedUser: User;
  resultsOfControlWorks: ResultOfControlWork[];

  constructor(private controlWorkService: ControlWorksService,
              private usersService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }



  ngOnInit() {
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
    this.isLoaded = false;
    this.completedTest = false;
    setTimeout(() => {
      this.sub1 = this.route.params.pipe(mergeMap((params: Params) => this.controlWorkService.getControlWorkById(params.id)))
        .subscribe((controlWork: ControlWork) => {
          this.usersService.getUserById(this.loginedUser.id).subscribe((user: User) => {
            this.loginedUser = user;
            // this.resultsOfControlWorks = this.loginedUser.resultsOfControlWorks.map(x => Object.assign({}, x));
          });
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
        });
    }, 1000);
  }

  Ok() {
    this.saveAnswer();
    if ((this.count + 1) < this.currentControlWork.tests.length) {
      this.count++;
      this.loadQuestion();
    } else {
      this.completeTest();
      this.loginedUser.resultsOfControlWorks.push({controlWork: this.currentControlWork, score: this.userScore, maxScore: this.maxScore});
      setTimeout(() => {
        this.usersService.updateUser(this.loginedUser).subscribe((user: User) => {
        // console.log(user);
        });
      }, 1000);
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
    // window.localStorage.setItem('user', JSON.stringify(this.loginedUser));
    // console.log(this.userScore);
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
