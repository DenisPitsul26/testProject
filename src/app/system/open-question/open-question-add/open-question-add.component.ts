import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';
import {OpenQuestionService} from '../../../shared/services/open-question.service';
import {OpenQuestionModel} from '../../../shared/models/open-question.model';
import {Subscription} from 'rxjs';
import {TestModel} from '../../../shared/models/test.model';

@Component({
  selector: 'app-open-question-add',
  templateUrl: './open-question-add.component.html',
  styleUrls: ['./open-question-add.component.css'],
  animations: [fadeStateTrigger]
})
export class OpenQuestionAddComponent implements OnInit, OnDestroy {
  @Output() addFormIsVisible = new EventEmitter<boolean>();
  @Output() newQuestionAdd = new EventEmitter<OpenQuestionModel>();
  openQuestion: string;
  sub2: Subscription;
  questionModel: OpenQuestionModel;
  constructor(private questionService: OpenQuestionService) { }

  ngOnInit() {
  }

  cancel() {
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
  addUpdateQuestion() {
    this.openQuestion = (document.getElementById('question') as HTMLInputElement).value;
    console.log(this.openQuestion);
    setTimeout( () => {
    this.questionModel = new OpenQuestionModel(this.openQuestion);
    this.sub2 = this.questionService.addQuestion(this.questionModel).subscribe( (questions: OpenQuestionModel) => {
      this.newQuestionAdd.emit(questions);
      this.addFormIsVisible.emit(false);
    });
    }, 10);
  }

  ngOnDestroy(): void {
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
