import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthController } from '../../services';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginInformation } from '../../models';
import { Router } from '@angular/router';
import { ValidationService } from '@shared/services/validation/validation.service';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';
import { BlockUiService } from '@shared/services/block-ui/block-ui.service';

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
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          if (res) {
            this.router.navigate(['/']);
          }
          this.blockUiService.unBlock();
        },
        () => {
          this.blockUiService.unBlock();
        },
      );
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
