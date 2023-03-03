import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Observable, switchMap } from 'rxjs';

import { ApiService } from '../api/api.service';
import { LoginInformation, NewUserInfo, SignupResponse, User } from '../../models';
import { Store } from '@ngxs/store';
import { AuthService } from '@shared/services/auth-service/auth-service.service';
import { AuthState, AuthStore, rememberMeAction, UserAction } from '@app/auth/store';
import { MatDialog } from '@angular/material/dialog';
import { PasswordResetComponent } from '@app/auth/components/password-reset/password-reset.component';
import { PersonalInfoService } from '@shared/services/personal-info/personal-info.service';

@Injectable()
export class ControllerService {
  rememberMe = this.store.selectSnapshot(AuthState.getRememberMe);

  constructor(
    private readonly api: ApiService,
    private readonly router: Router,
    private readonly store: Store,
    private readonly authService: AuthService,
    private dialog: MatDialog,
    private readonly personalInfoService: PersonalInfoService,
  ) {}

  cancel() {
    this.router.navigate(['/auth']);
  }

  signUp(personalData: NewUserInfo): Observable<SignupResponse> {
    return this.api.signUp(personalData);
  }

  login(credentials: LoginInformation): Observable<AuthStore> {
    return this.authService.login(credentials);
  }

  openResetPasswordModal(email?: string) {
    this.dialog
      .open(PasswordResetComponent, {
        width: '100vw',
        maxWidth: '100vw',
        data: email,
        position: { bottom: '0' },
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((email) => this.api.resetPassword(email)),
      )
      .subscribe();
  }

  setRememberMe(rememberMe: boolean) {
    this.store.dispatch(new rememberMeAction(rememberMe));
  }

  getCurrentUser(): Observable<User> {
    return this.api.getCurrentUser();
  }

  setUser(user: User) {
    return this.store.dispatch(new UserAction(user));
  }

  openPersonalInfoModal(): Observable<void> {
    return this.personalInfoService.openPersonalInfoModal();
  }
}
