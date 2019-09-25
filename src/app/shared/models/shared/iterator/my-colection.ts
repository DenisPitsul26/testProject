import {MyIterator} from './iterator';


export interface MyColection {
  getIterator(): MyIterator;
}
