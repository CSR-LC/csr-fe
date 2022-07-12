import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthController } from '../../services';
import { FormBuilder, Validators } from "@angular/forms";
import { LoginInformation } from "../../models";
import { Router } from "@angular/router";
import { ValidationService } from "@shared/services/validation/validation.service";
import {UntilDestroy, untilDestroyed} from "@shared/until-destroy/until-destroy";

@UntilDestroy
@Component({
  selector: 'lc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthController]
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    login: ['', [ Validators.required ]],
    password: ['', [ Validators.required ]],
  });

  constructor(
    private readonly controller: AuthController,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService,
  ) { }

  onLogin() {
    this.validationService.emitSubmit();

    if (!this.loginForm.valid) return;

    const { login, password } = this.loginForm.value;
    const credentials: LoginInformation = {
      login,
      password,
    };

    this.controller.login(credentials).pipe(
      untilDestroyed(this)
    ).subscribe(res => {
      if (res) this.router.navigate(['/'])
    });
  }
}
