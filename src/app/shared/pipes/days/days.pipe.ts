import { Pipe, PipeTransform } from '@angular/core';
import { DayCasesEnum } from '@shared/constants/day-cases.enum';

@Pipe({
  name: 'days',
})
export class DaysPipe implements PipeTransform {
  transform(num?: number | null): unknown {
    if (!num || num < 1) return '';

    const helperNumber = num > 19 ? this.getLastNumber(num) : num;

    if (helperNumber === 1) return `${num} ${DayCasesEnum.nominativeSingular}`;
    if (helperNumber > 1 && helperNumber < 5) return `${num} ${DayCasesEnum.genitiveSingular}`;
    return `${num} ${DayCasesEnum.genitivePlural}`;
  }

  private getLastNumber(num: number): number {
    const str = String(num);
    return Number(str.charAt(str.length - 1));
  }
}
