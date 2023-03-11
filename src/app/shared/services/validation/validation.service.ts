import { Injectable } from '@angular/core';
import { Dictionary, ErrorOptions } from '../../types';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private readonly submit$ = new Subject<string | undefined>();

  private readonly errorMessages: Dictionary<string> = {
    required: 'Обязательное поле',
    maxlength: 'Слишком большое знанеие, уменьшите количество символов',
    minlength: 'Слишком короткое значение, добавьте символы',
    email: 'Значение должно быть типа: example@mail.com',
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

  compare(errorOptions: ErrorOptions, compareControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const compareValue = compareControl.value;

      if (!this.areValuesComparable(value, compareValue)) return null;

      return value === compareValue ? null : { compare: { message: errorOptions.message } };
    };
  }

  pattern(errorOptions: ErrorOptions, pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = pattern.test(control.value);

      return isValid ? null : { pattern: { message: errorOptions.message } };
    };
  }

  validateForm(form: FormGroup): void {
    form.updateValueAndValidity();

    Object.values(form.controls).forEach((control) => {
      control.updateValueAndValidity();
      if ((control as FormGroup).controls) {
        this.validateForm(control as FormGroup);
      }
    });

    this.emitSubmit();
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
