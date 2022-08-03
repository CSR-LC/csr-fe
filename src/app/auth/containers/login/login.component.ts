import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthController } from '../../services';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginInformation, Tokens} from "../../models";
import {Store, Select} from "@ngxs/store";
import {AuthState, Login} from "../../store";
import {Observable} from "rxjs";

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

  @Select(AuthState.isAuthenticated) auth$!: Observable<AuthState>;

  constructor(
    private controller: AuthController,
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
  ) { }

  ngOnInit(): void {
    this.auth$.subscribe(res => console.log(res,'<<<'))
  }

  onLogin() {
    if (!this.loginForm.valid) return;

    const { login, password } = this.loginForm.value;
    const credentials: LoginInformation = {
      login,
      password,
    };


    this.store.dispatch(new Login(credentials));
  }
}
