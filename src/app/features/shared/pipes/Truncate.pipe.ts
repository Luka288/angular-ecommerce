import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, val: number = 15): string {
    const truncatedValue = value.split(' ');

    if (truncatedValue.length > val) {
      return truncatedValue.slice(0, val).join(' ') + '...';
    }
    return value;
  }
}
