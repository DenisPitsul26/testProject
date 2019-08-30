import {HttpClient} from '@angular/common/http';
import {BaseApi} from './base-api';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Group} from '../shared/models/group.model';

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
  getGroupById(id: number): Observable<any> {
    return this.get(`groups/${id}`);
  }
}
