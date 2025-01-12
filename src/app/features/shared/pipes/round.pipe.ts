import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
})
export class RoundPipe implements PipeTransform {
  transform(value: number, decimal: number): number {
    const factor = Math.pow(10, decimal);
    return Math.round(value * factor) / factor;
  }
}
