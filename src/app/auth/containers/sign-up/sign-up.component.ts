import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthController } from '../../services/index';
import { OnSubmitStateMatcher } from '../../../shared/error-matcher/on-submit.error-matcher';

@Component({
  selector: 'lc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
  providers: [ AuthController, 
               {provide: ErrorStateMatcher, useClass: OnSubmitStateMatcher}, ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  isFormSubmitted = false;

  constructor(private readonly controller: AuthController) {}

  userRegistrationForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(49),
      Validators.email,
    ])
  });

  disableKeyboardInput(event: KeyboardEvent, formFieldName: string) {
    if (event.key === 'Backspace') return;
    const formField = this.userRegistrationForm.get(formFieldName);
    if (formField?.errors && (formField.errors['maxlength'] || formField.errors['max'])) {
      return false;
    }
    return true;
  }

  onCancel() {
    this.controller.cancel();
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.userRegistrationForm.valid) {
      this.controller.signUp(this.userRegistrationForm.get('email')?.value);
    }
  }
}
