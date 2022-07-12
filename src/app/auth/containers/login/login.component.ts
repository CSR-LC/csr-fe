import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthController } from '../../services';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginInformation} from "../../models";

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
    private controller: AuthController,
    private readonly formBuilder: FormBuilder,
  ) { }

  onLogin() {
    if (!this.loginForm.valid) return;

    const { login, password } = this.loginForm.value;
    const credentials: LoginInformation = {
      login,
      password,
    };

    // TODO: unsubscribe
    this.controller.login(credentials).subscribe(res => console.log(res));
  }
}
