import { Injectable } from '@angular/core';
import { ApiService as AuthApi } from "./../api/api.service";

@Injectable()
export class ControllerService {

  constructor(
    private api: AuthApi
  ) { }

  public onLogin() {
    this.api.login();
  }
}
