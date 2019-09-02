import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../../auth/base-api';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestsService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }
  getTests(): Observable<any> {
    return this.get('tests');
  }
  getTestById(id: string): Observable<any> {
    return this.get(`tests/${id}`);
  }
}
