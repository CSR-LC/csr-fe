import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthController } from '../../services';

@Component({
  selector: 'lc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthController]
})
export class LoginComponent implements OnInit {

  constructor(
    private controller: AuthController
  ) { }

  ngOnInit(): void {
  }

  public onLogin() {
    this.controller.login();
  }

}