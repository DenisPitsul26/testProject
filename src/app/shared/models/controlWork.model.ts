import {TestModel} from './test.model';

export class ControlWork {
  constructor(public theme: string,
              public tests: TestModel[],
              public id?: number) {}
}
