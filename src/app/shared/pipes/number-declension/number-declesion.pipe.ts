import { Pipe, PipeTransform } from '@angular/core';
import { NumberCases } from '@shared/types/number-cases';

@Pipe({
  name: 'numberDeclension',
})
export class NumberDeclensionPipe implements PipeTransform {
  transform(cases: NumberCases, value?: number | null): string {
    if (value === null || value === undefined || value < 0) return '';

    const helperNumber = value > 19 ? this.getLastNumber(value) : value;

    if (helperNumber === 0) return `${value} ${cases.empty || cases.genitivePlural}`;
    if (helperNumber === 1) return `${value} ${cases.nominativeSingular}`;
    if (helperNumber >= 2 && helperNumber <= 4) return `${value} ${cases.genitiveSingular}`;
    return `${value} ${cases.genitivePlural}`;
  }

  private getLastNumber(num: number): number {
    const str = String(num);
    return Number(str.charAt(str.length - 1));
  }
}
