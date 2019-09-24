import {Component, HostListener, OnInit} from '@angular/core';
import {ControlWork} from '../../shared/models/controlWork.model';
import {ControlWorksService} from '../../shared/services/control-works.service';
import {Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {ActivatedRoute, NavigationStart, Params, Router} from '@angular/router';
import {User} from '../../shared/models/user.model';
import {Group} from '../../shared/models/group.model';
import {ResultOfControlWork} from '../../shared/models/result-of-control-work';
import {UserService} from '../../shared/services/user.service';
import {log} from 'util';
import {take, map} from 'rxjs/operators';
import {Observable, timer} from 'rxjs';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {AnswerInOpenQuestions} from '../../shared/models/answer-in-open-questions';

export let browserRefresh = false;

@Component({
  selector: 'app-write-control-work',
  templateUrl: './write-control-work.component.html',
  styleUrls: ['./write-control-work.component.css'],
  animations: [fadeStateTrigger]
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
  counterTime$: Observable<number>;
  countTime: number;
  countTimeMinutes = 30;
  countTimeMinutesCheck = this.countTimeMinutes;
  answersInOpenQuestions: AnswerInOpenQuestions[];
  isCloseTest = true;
  imageUrl: string;
  private subscription: Subscription;
  private allTime: number;
  constructor(private controlWorkService: ControlWorksService,
              private usersService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
      // --this.countTimeMinutes;
      // this.counterTime$ = timer(0, 1000).pipe(
      //   take(this.countTime),
      //   map(() => --this.countTime)
      //   );
      // if (this.countTime <= 0) {
      //   --this.countTimeMinutes;
      //   this.countTime = 60;
      // }
  }

  ngOnInit() {
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
    this.isLoaded = false;
    this.completedTest = false;
    // tslint:disable-next-line:only-arrow-functions
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', () => {
      history.pushState(null, null, document.URL);
    });
    // window.addEventListener('beforeunload', (event) => {
    //   // event.returnValue = false;
    //   event.returnValue = false;
    // });
    // window.addEventListener('unload', () => {
    //   event.returnValue = false;
    // });
    this.sub1 = this.route.params.pipe(mergeMap((params: Params) => this.controlWorkService.getControlWorkById(params.id)))
        .subscribe((controlWork: ControlWork) => {
          this.usersService.getUserById(this.loginedUser.id).subscribe((user: User) => {
            this.loginedUser = user;
            // this.resultsOfControlWorks = this.loginedUser.resultsOfControlWorks.map(x => Object.assign({}, x));
          });
          this.currentControlWork = controlWork;
          this.numberOfTests = this.currentControlWork.tests.length + this.currentControlWork.questions.length;
          this.question = this.currentControlWork.tests[this.count].question;
          this.answers = this.currentControlWork.tests[this.count].answers;

          this.allTime = this.currentControlWork.executionTime;
          setTimeout( () => {
            if (this.switchBtn) {
              for (let i = 1; i <= this.currentControlWork.tests[this.count].answers.length; i++) {
                (document.getElementById(String(i)) as HTMLInputElement).checked = false;
              }
            }
            this.completeTest();
          }, this.allTime * 60000);
          this.countTime = this.currentControlWork.executionTime;
          this.countTime *= 60;
          // this.countTime += 1;
          this.counterTime$ = timer(0, 1000).pipe(
            take(this.countTime),
            map(() => --this.countTime)
          );

          this.isLoaded = true;
          // document.getElementById('answer');
          this.userAnswers = new Array(this.currentControlWork.tests.length);
          for (let i = 0; i < this.currentControlWork.tests.length; i++) {
            this.userAnswers[i] = new Array(this.currentControlWork.tests[i].answers.length);
            for (let j = 0; j < this.currentControlWork.tests[i].answers.length; j++) {
              this.userAnswers[i][j] = false;
            }
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < this.currentControlWork.tests[i].correctAnswers.length; j++) {
              this.maxScore++;
            }
          }
          this.answersInOpenQuestions = new Array(this.currentControlWork.questions.length);
          for (let i = 0; i < this.currentControlWork.questions.length; i++) {
            this.answersInOpenQuestions[i] = new AnswerInOpenQuestions(this.currentControlWork.questions[i], '');
          }
        });
  }


  Ok() {
    this.saveAnswer();
    if ((this.count + 1) < (this.currentControlWork.tests.length + this.currentControlWork.questions.length)) {
      this.count++;
      if (this.count < this.currentControlWork.tests.length) {
        this.isCloseTest = true;
      } else {
        this.isCloseTest = false;
      }
      this.loadQuestion();
    } else {
      this.completeTest();
    }
  }
  loadQuestion() {
    if (this.isCloseTest) {
      this.imageUrl = '';
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
    } else {
      const x = this.count - this.currentControlWork.tests.length;
      this.question = this.currentControlWork.questions[x].question;
      if (this.currentControlWork.questions[x].url === '') {
        this.imageUrl = '';
      } else {
        this.imageUrl = this.currentControlWork.questions[x].url;
      }
      setTimeout(() => {
        (document.getElementById('openAnswer') as HTMLInputElement).value = this.answersInOpenQuestions[x].answersOfOpenQuestion;
      }, 10);
      // if (this.answersInOpenQuestions[x] === null) {
      //   (document.getElementById('openAnswer') as HTMLInputElement).value  = '';
      // } else {
      //   (document.getElementById('openAnswer') as HTMLInputElement).value = this.answersInOpenQuestions[x];
      // }
    }
  }
  saveAnswer() {
    if (this.count < this.currentControlWork.tests.length) {
      for (let i = 1; i <= this.currentControlWork.tests[this.count].answers.length; i++) {
        this.userAnswer = (document.getElementById(String(i)) as HTMLInputElement).checked;
        this.userAnswers[this.count][i - 1] = this.userAnswer;
      }
    } else {
      const x = this.count - this.currentControlWork.tests.length;
      if ((document.getElementById('openAnswer') as HTMLInputElement).value === null) {
        this.answersInOpenQuestions[x].answersOfOpenQuestion = '';
      } else {
        this.answersInOpenQuestions[x].answersOfOpenQuestion = (document.getElementById('openAnswer') as HTMLInputElement).value;
      }
    }
  }
  changeQuestion(number1: number) {
    this.saveAnswer();
    this.count = number1;
    if (this.count < this.currentControlWork.tests.length) {
      this.isCloseTest = true;
    } else {
      this.isCloseTest = false;
    }
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
    if (this.loginedUser.isAdmin === 0) {
      this.loginedUser.resultsOfControlWorks.push({
        controlWork: this.currentControlWork,
        answersOfOpenQuestion: this.answersInOpenQuestions,
        scoreForTestPart: this.userScore,
        score: 0,
        isChecked: false
      });
      setTimeout(() => {
        this.usersService.updateUser(this.loginedUser).subscribe((user: User) => {
          localStorage.setItem('user', JSON.stringify(user));
        });
      }, 1000);
    }
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
      // tslint:disable-next-line:only-arrow-functions
    }
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    console.log('Processing beforeunload...');
    // Do more processing...
    event.returnValue = false;
  }
  // @HostListener('window:unload', ['$event']) unloadHandler1(event: Event) {
  //   this.completeTest();
  //   // Do more processing...
  //   // event.returnValue = false;
  // }
}
