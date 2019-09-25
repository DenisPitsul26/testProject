import {User} from '../../user.model';

export class CopyUser {
  static getUser(user: User): User {
    return new User(user.email, user.password, user.name, user.isAdmin,
      user.groupId, user.resultsOfControlWorks, user.id);
  }
}
