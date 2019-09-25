import {TestModel} from './test.model';
import {OpenQuestionModel} from './open-question.model';

export class ControlWork {
  constructor(public theme: string,
              public tests?: TestModel[],
              public questions?: OpenQuestionModel[],
              public executionTime?: number,
              public id?: number
  ) {}
  start() {
    console.log('started');
  }
  finish() {
    console.log('finished');
  }

}
