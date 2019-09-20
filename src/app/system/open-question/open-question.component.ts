import {Component, OnDestroy, OnInit} from '@angular/core';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {TestModel} from '../../shared/models/test.model';
import {OpenQuestionModel} from '../../shared/models/open-question.model';
import {Subscription} from 'rxjs';
import {OpenQuestionService} from '../../shared/services/open-question.service';

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
  constructor(private questionService: OpenQuestionService) { }

  ngOnInit() {
    this.getQuestions();
  }
  getQuestions() {
   this.isLoaded = false;
   this.sub1 = this.questionService.getQuestions().subscribe((questions: OpenQuestionModel[]) => {
     this.questions = questions;
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
