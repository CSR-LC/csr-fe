import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthController } from '../../services';
import { OnSubmitStateMatcher } from '@shared/error-matcher/on-submit.error-matcher';
import { NewUserInfo, UserType } from '../../models';
import { Router } from '@angular/router';
import { ValidationService } from '@shared/services/validation/validation.service';
import { BlockUiService } from '@shared/services/block-ui/block-ui.service';
import { finalize, switchMap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';
import { AppRoutes } from '@app/shared/constants/routes.enum';

@UntilDestroy
@Component({
  selector: 'lc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [AuthController, { provide: ErrorStateMatcher, useClass: OnSubmitStateMatcher }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  private readonly controller = inject(AuthController);
  private readonly formBuilder = inject(UntypedFormBuilder);
  private readonly router = inject(Router);
  private readonly validationService = inject(ValidationService);
  private readonly blockUiService = inject(BlockUiService);

  userRegistrationForm = this.formBuilder.group({
    email: ['', [Validators.maxLength(49), Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.maxLength(49), Validators.minLength(6)]],
    confirmPassword: [''],
  });

  readonly formName = 'user_registration_form';
  readonly offerPath = `/${AppRoutes.PublicOffer}`;

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
        finalize(() => this.blockUiService.unBlock()),
        untilDestroyed(this),
      )
      .subscribe(() => this.router.navigate(['/']));
  }

  private getNewUserInfo(): NewUserInfo {
    const formValue = this.formValue;
    return {
      login: formValue.email,
      email: formValue.email,
      password: formValue.password,
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
      this.validationService.getCompareValidator({ message: 'Значения не совпадают' }, compareControl),
    ]);
  }
}
