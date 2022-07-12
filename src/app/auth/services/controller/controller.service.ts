import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from "../api/api.service";
import {LoginInformation, NewUserInfo, SignupResponse, Tokens} from "../../models";

@Injectable()
export class ControllerService {

  constructor(
    private readonly api: ApiService,
    private readonly router: Router
  ) { }

  cancel() {
    this.router.navigate(['/auth/login']);
  }

  signUp(personalData: NewUserInfo): Observable<SignupResponse> {
    return this.api.signUp(personalData);
  }

  login(credentials: LoginInformation): Observable<Tokens> {
    return this.api.login(credentials);
  }
}
