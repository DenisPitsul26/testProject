import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TestsService} from '../../../shared/services/tests.service';
import {TestModel} from '../../../shared/models/test.model';

@Component({
  selector: 'app-testing-add',
  templateUrl: './testing-add.component.html',
  styleUrls: ['./testing-add.component.css']
})
export class TestingAddComponent implements OnInit {
  count = 1;
  answers: string[] = [];
  correctAnswers: number[] = [];
  answer = '';
  correctAnswer = false;
  @Output() addFormIsVisible = new EventEmitter<boolean>();
  @Output() newTestAdded = new EventEmitter<TestModel>();
  question = '';
  testModel: TestModel;

  constructor(private testsService: TestsService) { }

  ngOnInit() {
  }

  addAnswer() {
    this.count++;
  }

  deleteAnswer() {
    if (this.count > 1) {
      this.count--;
    }
  }

  addTest() {
    this.question = (<HTMLInputElement> document.getElementById('question')).value;
    for (let i = 1; i <= this.count; i++) {
       this.answer = (<HTMLInputElement> document.getElementById(String(i))).value;
       this.correctAnswer = (<HTMLInputElement> document.getElementById(i + 'c')).checked;
       this.answers.push(this.answer);
       if (this.correctAnswer) {
         this.correctAnswers.push(i);
       }
    }
    console.log(this.answers);
    console.log(this.correctAnswers);
    if (this.answers && this.correctAnswers && this.question) {
      this.testModel = new TestModel(this.question, this.answers, this.correctAnswers);
      this.testsService.addTest(this.testModel).subscribe((test: TestModel) => {
        console.log(test);
        this.newTestAdded.emit(test);
      });
    }
    this.answers = [];
    this.correctAnswers = [];
    this.addFormIsVisible.emit(false);
  }

  cancel() {
    this.addFormIsVisible.emit(false);
  }
}
