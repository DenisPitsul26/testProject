import {HttpClient} from '@angular/common/http';
import {BaseApi} from './base-api';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }
  getGroups(): Observable<any> {
    return this.get('groups');
  }
}
