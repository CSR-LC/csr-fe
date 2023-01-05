import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthController } from '../../services';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginInformation } from '../../models';
import { Router } from '@angular/router';
import { ValidationService } from '@shared/services/validation/validation.service';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';
import { BlockUiService } from '@shared/services/block-ui/block-ui.service';
import { NotificationsService } from '@shared/services/notifications/notifications.service';
import { catchError, finalize, throwError } from 'rxjs';
import { NotificationSuccess } from '@shared/constants/notification-success.enum';

@UntilDestroy
@Component({
  selector: 'lc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthController],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  readonly formName = 'login_form';
  readonly rememberMe = this.controller.rememberMe;

  constructor(
    private readonly controller: AuthController,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService,
    private readonly blockUiService: BlockUiService,
    private readonly notificationsService: NotificationsService,
  ) {}

  onLogin() {
    this.validationService.emitSubmit(this.formName);

    if (!this.loginForm.valid) return;

    this.blockUiService.block();

    const { login, password } = this.loginForm.value;
    const credentials: LoginInformation = {
      login,
      password,
    };

    this.controller
      .login(credentials)
      .pipe(
        catchError((error) => {
          this.notificationsService.openError(error.message);
          return throwError(error);
        }),
        finalize(() => this.blockUiService.unBlock()),
        untilDestroyed(this),
      )
      .subscribe((res) => {
        if (res) {
          this.notificationsService.openSuccess(NotificationSuccess.Authorized);
          this.router.navigate(['/']);
        }
      });
  }

  onOpenResetPassword(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.controller.openResetPasswordModal(this.loginForm.value.login);
  }

  onChangeRememberMe(checked: boolean) {
    this.controller.setRememberMe(checked);
  }
}
