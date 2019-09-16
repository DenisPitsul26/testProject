import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToTime'
})
export class NumberToTimePipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let totalSeconds = value;

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    let str = '';

    if (hours < 10) {
      str = str + '0' + hours;
    } else {
      str = str + '' + hours;
    }
    if (minutes < 10) {
      str = str + ':0' + minutes;
    } else {
      str = str + ':' + minutes;
    }
    if (seconds < 10) {
      str = str + ':0' + seconds;
    } else {
      str = str + ':' + seconds;
    }
    return str;
  }

}
