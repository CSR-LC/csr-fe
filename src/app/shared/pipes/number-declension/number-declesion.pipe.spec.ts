import { NumberDeclensionPipe } from './number-declesion.pipe';
import { NumberCases } from '@shared/types/number-cases';

const cases: NumberCases = {
  nominativeSingular: 'день',
  genitiveSingular: 'дня',
  genitivePlural: 'дней',
  empty: 'empty',
};

const casesWithOutEmpty: NumberCases = {
  nominativeSingular: 'день',
  genitiveSingular: 'дня',
  genitivePlural: 'дней',
};

function getValue(num: number, str: string): string {
  return `${num} ${str}`;
}

describe('NumberDeclensionPipe', () => {
  let pipe: NumberDeclensionPipe;

  beforeEach(() => {
    pipe = new NumberDeclensionPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should treat null value', () => {
    let result = pipe.transform(cases, null);

    expect(result).toBe('');
  });

  it('should treat undefined value', () => {
    let result = pipe.transform(cases, undefined);

    expect(result).toBe('');
  });

  it('should treat negative value', () => {
    let result = pipe.transform(cases, -1);

    expect(result).toBe('');
  });

  it('should treat 0 value', () => {
    const value = 0;
    let result = pipe.transform(cases, value);

    expect(result).toBe(getValue(value, cases.empty as string));
  });

  it('should treat 0 value if cases has no empty value', () => {
    const value = 0;
    let result = pipe.transform(casesWithOutEmpty, value);

    expect(result).toBe(getValue(value, casesWithOutEmpty.genitivePlural));
  });

  it('should treat 20 value if cases has no empty value', () => {
    const value = 20;
    let result = pipe.transform(casesWithOutEmpty, value);

    expect(result).toBe(getValue(value, casesWithOutEmpty.genitivePlural));
  });

  it('should treat 1 value', () => {
    const value = 1;
    let result = pipe.transform(cases, value);

    expect(result).toBe(getValue(value, cases.nominativeSingular));
  });

  it('should treat 21 value', () => {
    const value = 21;
    let result = pipe.transform(cases, value);

    expect(result).toBe(getValue(value, cases.nominativeSingular));
  });

  it('should treat 2 value', () => {
    const value = 2;
    let result = pipe.transform(cases, value);

    expect(result).toBe(getValue(value, cases.genitiveSingular));
  });

  it('should treat 22 value', () => {
    const value = 22;
    let result = pipe.transform(cases, value);

    expect(result).toBe(getValue(value, cases.genitiveSingular));
  });

  it('should treat 4 value', () => {
    const value = 4;
    let result = pipe.transform(cases, value);

    expect(result).toBe(getValue(value, cases.genitiveSingular));
  });

  it('should treat 24 value', () => {
    const value = 24;
    let result = pipe.transform(cases, value);

    expect(result).toBe(getValue(value, cases.genitiveSingular));
  });

  it('should treat 5 value', () => {
    const value = 5;
    let result = pipe.transform(cases, value);

    expect(result).toBe(getValue(value, cases.genitivePlural));
  });

  it('should treat 25 value', () => {
    const value = 25;
    let result = pipe.transform(cases, value);

    expect(result).toBe(getValue(value, cases.genitivePlural));
  });

  it('should treat 19 value', () => {
    const value = 19;
    let result = pipe.transform(cases, value);

    expect(result).toBe(getValue(value, cases.genitivePlural));
  });
});
