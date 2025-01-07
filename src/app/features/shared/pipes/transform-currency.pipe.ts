import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformCurrency',
})
export class TransformCurrencyPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'GEL') {
      let gelSymbol = '₾';

      return gelSymbol;
    } else if (value === 'USD') {
      let usdSymbol = '$';

      return usdSymbol;
    }

    return value;
  }
}
