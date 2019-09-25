import {MyIterator} from './iterator';
import {User} from '../../user.model';

export class UsersIterator implements MyIterator {
  private index = 0;

  constructor(public users: User[]) {}

  hasNext() {
    if (this.index > this.users.length) {
      return true;
    }
    return false;
  }

  next(): object {
    return this.users[this.index++];
  }

}
