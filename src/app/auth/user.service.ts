import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../shared/models/User.model';
import {BaseApi} from './base-api';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getAllUsers(): Observable<any> {
    return this.get('users');
  }

  getUserByEmail(email: string): Observable<any> {
    return this.get(`users?email=${email}`)
      .pipe(map((users: User[]) => {
        return users[0] ? users[0] : undefined;
      }));
  }

  createNewUser(user: User): Observable<any> {
    return this.post('users', user);
  }
}
