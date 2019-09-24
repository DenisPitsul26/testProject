import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
  @Input() currentQuestion: OpenQuestionModel;
  openQuestion: string;
  sub2: Subscription;
  sub3: Subscription;
  questionModel: OpenQuestionModel;
  imageUrl = '';
  fileToUpload: File = null;
  constructor(private questionService: OpenQuestionService) { }

  ngOnInit() {
    setTimeout( () => {
    if (this.currentQuestion !== undefined) {
      (document.getElementById('question') as HTMLInputElement).value = this.currentQuestion.question;
      this.imageUrl = this.currentQuestion.url;
    }
    }, 5);
  }

  cancel() {
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
    this.addFormIsVisible.emit(false);
  }
  addUpdateQuestion() {
    this.openQuestion = (document.getElementById('question') as HTMLInputElement).value;
    console.log(this.openQuestion);
    setTimeout( () => {
      if (this.currentQuestion === undefined) {
        this.questionModel = new OpenQuestionModel(this.openQuestion, this.imageUrl);
        this.sub2 = this.questionService.addQuestion(this.questionModel).subscribe( (questions: OpenQuestionModel) => {
          this.newQuestionAdd.emit(questions);
          this.addFormIsVisible.emit(false);
        });
      } else {
        this.questionModel = new OpenQuestionModel(this.openQuestion, this.imageUrl, this.currentQuestion.id);
        this.sub3 = this.questionService.updateQuestion(this.questionModel).subscribe( (questions: OpenQuestionModel) => {
          this.newQuestionAdd.emit(questions);
          this.addFormIsVisible.emit(false);
        });
      }
    }, 10);
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.fileToUpload);
  }

  ngOnDestroy(): void {
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
  }
}
