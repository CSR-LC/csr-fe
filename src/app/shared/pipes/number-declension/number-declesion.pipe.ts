import { Pipe, PipeTransform } from '@angular/core';
import { NumberCases } from '@shared/types/number-cases';

@Pipe({
  name: 'numberDeclension',
})
export class NumberDeclensionPipe implements PipeTransform {
  transform(cases: NumberCases, value?: number | null): string {
    if (value === null || value === undefined || value < 0) return '';

    const helperNumber = value > 19 ? this.getLastNumber(value) : value;

    return this.getValue(cases, helperNumber);
  }

  private getLastNumber(num: number): number {
    const str = String(num);
    return Number(str.charAt(str.length - 1));
  }

  private getValue(cases: NumberCases, value: number): string {
    if (value === 0) return `${value} ${cases.empty || cases.genitivePlural}`;
    if (value === 1) return `${value} ${cases.nominativeSingular}`;
    if (value > 1 && value < 5) return `${value} ${cases.genitiveSingular}`;
    return `${value} ${cases.genitivePlural}`;
  }
}
