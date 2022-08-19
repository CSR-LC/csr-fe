import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from "../api/api.service";
import {LoginInformation, NewUserInfo, SignupResponse, Tokens} from "../../models";
import {Store} from "@ngxs/store";
import {AuthService} from "@shared/services/auth-service/auth-service.service";
import {AuthStore} from "@app/auth/store";

@Injectable()
export class ControllerService {

  constructor(
    private readonly api: ApiService,
    private readonly router: Router,
    private readonly store: Store,
    private readonly authService: AuthService,
  ) { }

  cancel() {
    this.router.navigate(['/auth/login']);
  }

  signUp(personalData: NewUserInfo): Observable<SignupResponse> {
    return this.api.signUp(personalData);
  }

  login(credentials: LoginInformation): Observable<AuthStore> {
    return this.authService.login(credentials);
  }
}
