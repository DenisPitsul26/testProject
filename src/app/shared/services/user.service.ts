import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {map} from 'rxjs/operators';
import {BaseApi} from '../models/base-api';

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
  getUserById(id: number): Observable<any> {
    return this.get(`users/${id}`);
  }

  getUsersByGroupId(groupId: number): Observable<any> {
    return this.get(`users?groupId=${groupId}`);
  }

  createNewUser(user: User): Observable<any> {
    return this.post('users', user);
  }

  updateUser(user: User) {
    return this.put(`users/${user.id}`, user);
  }
}
