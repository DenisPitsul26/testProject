import {Command} from './command';

export class ControlWorkMeneger {

  constructor(private startControlWork: Command, private finishControlWork: Command) {}

  startControlWork1() {
    this.startControlWork.execute();
  }
  finishControlWork1() {
    this.finishControlWork.execute();
  }
}
