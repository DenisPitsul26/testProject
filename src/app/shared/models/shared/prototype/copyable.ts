import {User} from '../../user.model';

export interface Copyable {
  copyUser(): object;
}
