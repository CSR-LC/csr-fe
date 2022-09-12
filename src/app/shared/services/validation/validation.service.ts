import { Injectable } from '@angular/core';
import { Dictionary, ErrorOptions } from "../../types";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private readonly submit$ = new Subject();

  private readonly errorMessages: Dictionary<string> = {
    required: 'Обязательное поле',
    maxlength: 'Слишком большое знанеие, уменьшите количество символов',
    minlength: 'Слишком короткое значение, добавтесимволы',
    email: 'Значение должно быть типа: example@mail.com',
  }

  getSubmitObservable(): Observable<unknown> {
    return this.submit$ as Observable<unknown>
  }

  emitSubmit(): void {
    this.submit$.next(undefined);
  }

  getErrorTextByKey(key: string): string | undefined {
    return this.errorMessages[key];
  }

  compare(errorOptions: ErrorOptions, compareControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const compareValue = compareControl.value;

      if (!this.areValuesComparable(value, compareValue)) return null;

      return  value === compareValue
        ? null
        : { compare: { message: errorOptions.message }}
    }
  }

  private areValuesComparable(value: any, compareValue: any): boolean {
    if (!value || !compareValue) return false;

    const valueType = typeof value;
    const compareValueType = typeof compareValue;

    return valueType === compareValueType
      && (valueType === 'string' || valueType === 'number')
      && (compareValueType === 'string' || compareValueType === 'number');
  }
}
