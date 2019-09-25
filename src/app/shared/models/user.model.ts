import {ResultOfControlWork} from './result-of-control-work';
import {MyColection} from './shared/iterator/my-colection';
import {MyIterator} from './shared/iterator/iterator';
import {Copyable} from './shared/prototype/copyable';

export class User {
  constructor(public email: string,
              public password: string,
              public name: string,
              public isAdmin: number,
              public groupId?: number,
              public resultsOfControlWorks?: ResultOfControlWork[],
              public id?: number,
              public numberOfGroup?: string
  ) {}
  // copyUser(): User {
  //   return new User(this.email, this.password, this.name, this.isAdmin,
  //     this.groupId, this.resultsOfControlWorks, this.id);
  // }
}
