import {ResultOfControlWork} from './result-of-control-work';

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
}
