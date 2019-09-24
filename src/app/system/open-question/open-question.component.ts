import {Component, OnDestroy, OnInit} from '@angular/core';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {TestModel} from '../../shared/models/test.model';
import {OpenQuestionModel} from '../../shared/models/open-question.model';
import {Subscription} from 'rxjs';
import {OpenQuestionService} from '../../shared/services/open-question.service';
import {ControlWork} from '../../shared/models/controlWork.model';
import {ControlWorksService} from '../../shared/services/control-works.service';

@Component({
  selector: 'app-open-question',
  templateUrl: './open-question.component.html',
  styleUrls: ['./open-question.component.css'],
  animations: [fadeStateTrigger]
})
export class OpenQuestionComponent implements OnInit, OnDestroy {
  isLoaded = false;
  isAddFormVisible = false;
  questions: OpenQuestionModel[];
  currentQuestion: OpenQuestionModel;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  controls: ControlWork[];
  isImageQuestion: boolean[] = [];

  constructor(private questionService: OpenQuestionService, private controlWorksService: ControlWorksService) { }

  ngOnInit() {
    this.getQuestions();
  }
  getQuestions() {
   this.isLoaded = false;
   this.sub1 = this.questionService.getQuestions().subscribe((questions: OpenQuestionModel[]) => {
     this.questions = questions;
     for (let i = 0; i < this.questions.length; i++) {
       if (this.questions[i].url === '') {
         this.isImageQuestion[i] = false;
       } else {
         this.isImageQuestion[i] = true;
       }
     }
     this.isLoaded = true;
   });
  }
  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    this.isLoaded = false;
  }
  addQuestionForm() {
    this.isAddFormVisible = true;
    this.currentQuestion = undefined;
  }
  deleteQuestion(id: number) {
    this.sub1 = this.questionService.deleteQuestion(id).subscribe(() => {
      this.getQuestions();
    });
    this.sub2 = this.controlWorksService.getControlWorks().subscribe((controlWorks: ControlWork[]) => {
      this.controls = controlWorks;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.controls.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < this.controls[i].questions.length; j++) {
          if (this.controls[i].questions[j].id === id) {
            this.controls[i].questions.splice(j, 1);
            this.sub3 = this.controlWorksService.updateControl(this.controls[i]).subscribe( (control: ControlWork) => {
              console.log(control);
            });
          }
        }
      }
    });
  }
  newQuestionAdd(quest: OpenQuestionModel) {
    this.getQuestions();
  }
  cancelForm(flag: boolean) {
    this.isAddFormVisible = flag;
  }
  updateQuestion(question: OpenQuestionModel) {
    this.isAddFormVisible = true;
    this.currentQuestion = question;
  }
}
