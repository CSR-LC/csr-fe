import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
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
  consentText:  string = 'Я даю согласие на обработку персональных данных';
  isFormSubmitted = false;

  userRegistrationForm = this.formBuilder.group({
    login: [
      '',
      [ Validators.maxLength(49), Validators.required ]
    ],
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
    consent: [
      '',
      [ Validators.requiredTrue ]
    ]
  });

  constructor(
    private readonly controller: AuthController,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
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
    if (
      !this.userRegistrationForm.valid
      || this.formValue.password !== this.formValue.confirmPassword
    ) return;

    this.isFormSubmitted = true;

    const personalData: NewUserInfo = this.getNewUserInfo();
    
    // TODO: unsubscribe
    this.controller.signUp(personalData).pipe().subscribe(
      (res) => {
      this.isFormSubmitted = false;
      if ((res.data as SuccessSignup).login) {
        this.router.navigate(['/auth/login']);
      }
    }, 
    () => {
      this.isFormSubmitted = false;
      this.cdr.markForCheck();
    });    
  }

  private getNewUserInfo(): NewUserInfo {
    // TODO: correct the value when back remove required fields
    const formValue = this.formValue;
    return {
      login: formValue.login,
      email: formValue.email,
      password: formValue.password,
      name: formValue.login,
      type: UserType.person,
    };
  }
}
