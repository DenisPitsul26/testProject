import {Command} from './command';
import {ControlWork} from '../../controlWork.model';

export class StartControlWork implements Command {

  constructor(private controlWork: ControlWork) {}

  execute() {
    this.controlWork.start();
  }
  
}
