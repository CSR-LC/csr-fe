import { Injectable } from '@angular/core';
import { Dictionary, ErrorOptions } from '../../types';
import { AbstractControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private readonly submit$ = new Subject<string | undefined>();

  private readonly errorMessages: Dictionary<string> = {
    required: 'Обязательное поле',
    maxlength: 'Слишком большое знанеие, уменьшите количество символов',
    minlength: 'Слишком короткое значение, добавтесимволы',
    email: 'Значение должно быть типа: example@mail.com',
    controlChanged: 'Измените значение',
  };

  getSubmitObservable(): Observable<string | undefined> {
    return this.submit$ as Observable<string | undefined>;
  }

  emitSubmit(formName?: string): void {
    this.submit$.next(formName);
  }

  getErrorTextByKey(key: string): string | undefined {
    return this.errorMessages[key];
  }

  getCompareValidator(errorOptions: ErrorOptions, compareControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const compareValue = compareControl.value;

      if (!this.areValuesComparable(value, compareValue)) return null;

      return value === compareValue ? null : { compare: { message: errorOptions.message } };
    };
  }

  getPatternValidator(errorOptions: ErrorOptions, pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = pattern.test(control.value);

      return isValid ? null : { pattern: { message: errorOptions.message } };
    };
  }

  getCustomValidator(options: ErrorOptions, callback: (v: any) => boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = callback(control.value);
      return isValid ? null : { custom: { message: options.message } };
    };
  }

  getControlChangedValidator(options?: ErrorOptions): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = control.dirty;
      return isValid ? null : { controlChanged: { message: options?.message || this.errorMessages['controlChanged'] } };
    };
  }

  private areValuesComparable(value: any, compareValue: any): boolean {
    if (!value || !compareValue) return false;

    const valueType = typeof value;
    const compareValueType = typeof compareValue;

    return (
      valueType === compareValueType &&
      (valueType === 'string' || valueType === 'number') &&
      (compareValueType === 'string' || compareValueType === 'number')
    );
  }
}
