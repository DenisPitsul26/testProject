import {HttpClient} from '@angular/common/http';
import {BaseApi} from './base-api';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Group} from '../shared/models/group.model';
import {group} from '@angular/animations';

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
  addGroup(group1: Group): Observable<any> {
    return this.post('groups', group1);
  }
  updateGroup(group1: Group): Observable<any> {
    return this.put(`groups/${group1.id}`, group1);
  }
  deleteGroup(id: number): Observable<any> {
    return this.delete(`groups/${id}`);
  }
}
