import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthController } from '../../services';
import { OnSubmitStateMatcher } from '@shared/error-matcher/on-submit.error-matcher';
import { NewUserInfo, UserType } from '../../models';
import { Router } from '@angular/router';
import { ValidationService } from '@shared/services/validation/validation.service';
import { BlockUiService } from '@shared/services/block-ui/block-ui.service';
import { catchError, finalize, switchMap, take, throwError } from 'rxjs';
import { NotificationsService } from '@shared/services/notifications/notifications.service';
import { PersonalInfoService } from '@shared/services/personal-info/personal-info.service';
import { PersonalInfo } from '@shared/constants/personal-info.enum';

@Component({
  selector: 'lc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [AuthController, { provide: ErrorStateMatcher, useClass: OnSubmitStateMatcher }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  userRegistrationForm = this.formBuilder.group({
    email: ['', [Validators.maxLength(49), Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.maxLength(49), Validators.minLength(6)]],
    confirmPassword: [''],
  });

  readonly formName = 'user_registration_form';

  constructor(
    private readonly controller: AuthController,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly validationService: ValidationService,
    private readonly blockUiService: BlockUiService,
    private readonly notificationsService: NotificationsService,
    private readonly personalInfoService: PersonalInfoService,
  ) {}

  get formValue() {
    return this.userRegistrationForm.value;
  }

  ngOnInit(): void {
    this.setConfirmPasswordValidation();
  }

  disableKeyboardInput(event: KeyboardEvent, formFieldName: string) {
    if (event.key === 'Backspace') return;
    const formField = this.userRegistrationForm.get(formFieldName);
    return !(formField?.errors && (formField.errors['maxlength'] || formField.errors['max']));
  }

  onSubmit() {
    this.validationService.emitSubmit(this.formName);

    if (!this.userRegistrationForm.valid || this.formValue.password !== this.formValue.confirmPassword) return;

    this.blockUiService.block();
    const personalData: NewUserInfo = this.getNewUserInfo();

    this.controller
      .signUp(personalData)
      .pipe(
        switchMap(() => {
          return this.controller.login({
            login: this.formValue.email,
            password: this.formValue.password,
          });
        }),
        catchError((error) => {
          this.notificationsService.openError(error.message);
          return throwError(error);
        }),
        finalize(() => this.blockUiService.unBlock()),
        take(1),
      )
      .subscribe(() => {
        this.personalInfoService.openPersonalInfoModal(PersonalInfo.RegistrationPage);
        this.router.navigate(['/']);
      });
  }

  private getNewUserInfo(): NewUserInfo {
    // TODO: correct the value when back remove required fields
    const formValue = this.formValue;
    return {
      login: formValue.email,
      email: formValue.email,
      password: formValue.password,
      name: formValue.email,
      type: UserType.person,
    };
  }

  private setConfirmPasswordValidation(): void {
    const control = this.userRegistrationForm.controls['confirmPassword'];
    const compareControl = this.userRegistrationForm.controls['password'];

    control?.setValidators([
      Validators.required,
      Validators.maxLength(49),
      Validators.minLength(6),
      this.validationService.compare({ message: 'Значения не совпадают' }, compareControl),
    ]);
  }
}
