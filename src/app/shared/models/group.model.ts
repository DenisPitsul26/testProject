import {ControlWork} from './controlWork.model';

export class Group {
  constructor(public group: string,
              public faculty: string,
              public expectedControlWorks?: ControlWork[],
              public id?: number) {}
}
