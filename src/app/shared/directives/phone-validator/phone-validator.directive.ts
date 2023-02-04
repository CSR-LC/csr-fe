import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[lcPhoneValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PhoneValidatorDirective, multi: true }],
})
export class PhoneValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const PHONE_REGEXP = /[0-9]+/;
    const isValid = PHONE_REGEXP.test(control.value);

    return isValid ? null : { phoneValidator: { message: 'Номер телефона должен состоять исключительно из цифр' } };
  }
}
