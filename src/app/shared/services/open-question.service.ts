import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../models/base-api';
import {Observable} from 'rxjs';
import {OpenQuestionModel} from '../models/open-question.model';

@Injectable({
  providedIn: 'root'
})
export class OpenQuestionService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }
  getQuestions(): Observable<any> {
    return this.get('openQuestions');
  }
  getQuestionsById(id: string): Observable<any> {
    return this.get(`openQuestions/${id}`);
  }
  addQuestion(questionModel: OpenQuestionModel): Observable<any> {
    return this.post('openQuestions', questionModel);
  }
  updateQuestion(questionModel: OpenQuestionModel): Observable<any> {
    return this.put(`openQuestions/${questionModel.id}`, questionModel);
  }
  deleteQuestion(id: number): Observable<any> {
    return this.delete(`openQuestions/${id}`);
  }
}
