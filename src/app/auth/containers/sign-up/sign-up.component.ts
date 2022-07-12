import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import {AuthController} from '../../services/index';
import {OnSubmitStateMatcher} from '../../../shared/error-matcher/on-submit.error-matcher';
import {NewUserInfo, SuccessSignup, UserType} from "../../models";
import {Router} from "@angular/router";

@Component({
  selector: 'lc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
  providers: [
    AuthController,
    { provide: ErrorStateMatcher, useClass: OnSubmitStateMatcher },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  isFormSubmitted = false;

  userRegistrationForm = this.formBuilder.group({
    email: [
      '',
      [ Validators.maxLength(49), Validators.email, Validators.required ]
    ],
    password: [
      '',
      [ Validators.required, Validators.maxLength(49), Validators.minLength(6) ]
    ],
    confirmPassword: [
      '',
      [ Validators.required, Validators.maxLength(49), Validators.minLength(6) ]
    ],
  });

  constructor(
    private readonly controller: AuthController,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {}

  get formValue() {
    return this.userRegistrationForm.value;
  }

  ngOnInit(): void {
    this.userRegistrationForm.valueChanges.subscribe(res => console.log(res));
  }

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

    if (
      !this.userRegistrationForm.valid
      || this.formValue.password !== this.formValue.confirmPassword
    ) return;

    const personalData: NewUserInfo = this.getNewUserInfo();

    // TODO: unsubscribe
    this.controller.signUp(personalData).subscribe((res) => {
      if ((res.data as SuccessSignup).login) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  private getNewUserInfo(): NewUserInfo {
    // TODO: correct the value when back remove required fields
    return {
      email: this.formValue.email,
      password: this.formValue.password,
      name: this.formValue.email,
      type: UserType.person,
    };
  }
}
