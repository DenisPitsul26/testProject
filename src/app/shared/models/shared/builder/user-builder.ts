import {ResultOfControlWork} from '../../result-of-control-work';
import {User} from '../../user.model';

export class UserBuilder {
  public email: string;
  public password: string;
  public name: string;
  public isAdmin: number;
  public groupId?: number;
  public resultsOfControlWorks?: ResultOfControlWork[];
  public id?: number;
  public numberOfGroup?: string;
  constructor() {}
  setEmail(email: string) {
    this.email = email;
  }
  setPassword(password: string) {
    this.password = password;
  }
  setName(name: string) {
    this.name = name;
  }
  setIsAdmin(isAdmin: number) {
    this.isAdmin = isAdmin;
  }
  setGroupId(groupId: number) {
    this.groupId = groupId;
  }
  setResultsOfControlWorks(resultsOfControlWorks: ResultOfControlWork[]) {
    this.resultsOfControlWorks = resultsOfControlWorks;
  }
  setId(id: number) {
    this.id = id;
  }
  setNumberOfGroup(numberOfGroup: string) {
    this.numberOfGroup = numberOfGroup;
  }

  getUser(): User {
    return new User(this.email, this.password, this.name, this.isAdmin, this.groupId,
      this.resultsOfControlWorks, this.id, this.numberOfGroup);
  }
}
