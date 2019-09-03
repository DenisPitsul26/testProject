import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCount'
})
export class MyCountPipe implements PipeTransform {

  transform(value: number, args: string[]): any {
    const res = [];
    for (let i = 1; i < value + 1; i++) {
      res.push(i);
    }
    return res;
  }

}
