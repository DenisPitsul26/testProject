import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../shared/models/user.model';
import {Group} from '../../../shared/models/group.model';
import {Subscription} from 'rxjs';
import {GroupService} from '../../../shared/services/group.service';
import {UserService} from '../../../shared/services/user.service';
import {Router} from '@angular/router';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit, OnDestroy {

  isLoaded = false;
  users: User[] = [];
  loginedUser: User;
  sub1: Subscription;
  scoresForAllControlWorksOfAllUsers: number[][] = [];
  // maxScores = [];
  @Input('group') groupOfLoginedUser: Group;
  flag = false;
  score1 = -1;

  constructor(private groupService: GroupService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.isLoaded = false;
    this.loginedUser = JSON.parse(localStorage.getItem('user'));
    this.sub1 = this.userService.getUsersByGroupId(this.groupOfLoginedUser.id).subscribe((users: User[]) => {
      this.users = users;
      this.scoresForAllControlWorksOfAllUsers = new Array(this.users.length);
      for (let i = 0; i < this.users.length; i++) {
          this.scoresForAllControlWorksOfAllUsers[i] = new Array(this.groupOfLoginedUser.expectedControlWorks.length);
          for (let j = 0; j < this.groupOfLoginedUser.expectedControlWorks.length; j++) {
            this.scoresForAllControlWorksOfAllUsers[i][j] = -1;
          }
      }
      setTimeout(() => {
        this.makeArray();
        this.isLoaded = true;
      }, 100);
      // this.getMaxScores();
    });
  }
  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
  makeArray() {
    for (let i = 0; i < this.users.length; i++) {
      // const array = new Array(this.groupOfLoginedUser.expectedControlWorks.length);
      for (let j = 0; j < this.groupOfLoginedUser.expectedControlWorks.length;  j++) {
        this.score1 = -1;
        // tslint:disable-next-line:prefer-for-of
        for (let z = 0; z < this.users[i].resultsOfControlWorks.length; z++) {
          if (this.groupOfLoginedUser.expectedControlWorks[j].id === this.users[i].resultsOfControlWorks[z].controlWork.id) {
            if (this.users[i].resultsOfControlWorks[z].isChecked) {
              // array.push(this.users[i].resultsOfControlWorks[z].score);
              this.flag = true;
              this.score1 = this.users[i].resultsOfControlWorks[z].score;
            } else {
              this.score1 = -2;
            }
          }
        }
        // if (this.flag) {
        //   this.scoresForAllControlWorksOfAllUsers[i][j] = this.score1;
        // }
        if (this.score1 === -1) {
          this.scoresForAllControlWorksOfAllUsers[i][j] = -1;
        } else if (this.score1 === -2) {
          this.scoresForAllControlWorksOfAllUsers[i][j] = -2;
        } else {
          this.scoresForAllControlWorksOfAllUsers[i][j] = this.score1;
        }
      }
    }
    // console.log('matrix', this.scoresForAllControlWorksOfAllUsers);
    // console.log('users', this.users.length);
  }

  checkControlWork(indexUser: number, indexControlWork: number) {
    console.log(this.users[indexUser], this.groupOfLoginedUser.expectedControlWorks[indexControlWork]);
    this.router.navigate(['/evaluate-test'],
      {queryParams: {studentId: this.users[indexUser].id,
                            controlWorkId: this.groupOfLoginedUser.expectedControlWorks[indexControlWork].id}});
  }

  // getMaxScores() {
  //   for (let i = 0; i < this.groupOfLoginedUser.expectedControlWorks.length; i++) {
  //     let count = 0;
  //     // tslint:disable-next-line:prefer-for-of
  //     for (let j = 0; j < this.groupOfLoginedUser.expectedControlWorks[i].tests.length; j++) {
  //       // tslint:disable-next-line:prefer-for-of
  //       for (let k = 0; k < this.groupOfLoginedUser.expectedControlWorks[i].tests[j].correctAnswers.length; k++) {
  //         count++;
  //       }
  //     }
  //     this.maxScores[i] = count;
  //   }
  // }
}
