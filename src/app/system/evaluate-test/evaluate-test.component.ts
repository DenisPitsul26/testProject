import {Component, OnDestroy, OnInit} from '@angular/core';
import {mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import {ControlWorksService} from '../../shared/services/control-works.service';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user.model';
import {ControlWork} from '../../shared/models/controlWork.model';
import {ResultOfControlWork} from '../../shared/models/result-of-control-work';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';

@Component({
  selector: 'app-evaluate-test',
  templateUrl: './evaluate-test.component.html',
  styleUrls: ['./evaluate-test.component.css'],
  animations: [fadeStateTrigger]
})
export class EvaluateTestComponent implements OnInit, OnDestroy {
  isLoaded = false;
  private sub1: Subscription;
  private currentStudent: User;
  private currentControlWork: ControlWork;
  private currentResultOfConrtolWork: ResultOfControlWork;
  private maxScoreForTestPart = 0;
  private sub2: Subscription;
  scoreForQuestion = 0;
  private isConrtolWorlWithOpenQuestion = false;

  constructor(private route: ActivatedRoute,
              private controlWorkService: ControlWorksService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.isLoaded = false;
    this.sub1 = this.route.queryParams
      .pipe(mergeMap((params: Params) => combineLatest(
        this.userService.getUserById(params.studentId),
        this.controlWorkService.getControlWorkById(params.controlWorkId)
        ))
      )
      .subscribe((data: [User, ControlWork]) => {
        this.currentStudent = data[0];
        this.currentControlWork = data[1];
        this.isConrtolWorlWithOpenQuestion = this.currentControlWork.questions.length > 0;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.currentStudent.resultsOfControlWorks.length; i++) {
          if (this.currentStudent.resultsOfControlWorks[i].controlWork.id === this.currentControlWork.id) {
            this.currentResultOfConrtolWork = this.currentStudent.resultsOfControlWorks[i];
            break;
          }
        }
        this.maxScoreForTestPart = this.getMaxScoreForTestPart();
        this.isLoaded = true;
      });
  }
  getMaxScoreForTestPart() {
    let count = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.currentControlWork.tests.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let k = 0; k < this.currentControlWork.tests[i].correctAnswers.length; k++) {
        count++;
      }
    }
    return count;
  }

  toEvaluate() {
    if (this.scoreForQuestion >= 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.currentStudent.resultsOfControlWorks.length; i++) {
        if (this.currentStudent.resultsOfControlWorks[i].controlWork.id === this.currentResultOfConrtolWork.controlWork.id) {
          this.currentStudent.resultsOfControlWorks[i].score = this.currentResultOfConrtolWork.scoreForTestPart + this.scoreForQuestion;
          this.currentStudent.resultsOfControlWorks[i].isChecked = true;
          this.sub2 = this.userService.updateUser(this.currentStudent).subscribe((user: User) => {
            this.router.navigate(['/scores']);
          });
        }
      }
    } else {
      alert('input correct value');
    }
  }

  ngOnDestroy(): void {
  }
}
