import {ControlWork} from './controlWork.model';

export class ResultOfControlWork {
  constructor(public controlWork: ControlWork, public score: number, public maxScore: number) {}
}
