import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size',
})
export class SizePipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'универсальный') return '';
    else return `(${value})`;
  }
}
