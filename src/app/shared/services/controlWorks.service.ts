import {Injectable} from '@angular/core';
import {BaseApi} from '../../auth/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlWorksService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }
  getControlWorks() {
    return this.get('controlWorks');
  }
  getControlWorkById(id: string): Observable<any> {
    return this.get(`controlWorks/${id}`);
  }
}
