import {ControlWork} from '../../controlWork.model';
import {Command} from './command';

export class FinishControlWork implements Command {
  constructor(private controlWork: ControlWork) {}

  execute() {
    this.controlWork.start();
  }
}
