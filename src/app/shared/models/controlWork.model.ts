import {TestModel} from './test.model';

export class ControlWork {
  constructor(public theme: string,
              public tests?: TestModel[],
              public executionTime?: number,
              public id?: number
  ) {}

}
