import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Observable, switchMap } from 'rxjs';

import { ApiService } from '../api/api.service';
import { LoginInformation, NewUserInfo, SignupResponse, User } from '../../models';
import { Store } from '@ngxs/store';
import { AuthService } from '@shared/services/auth-service/auth-service.service';
import { AuthState, rememberMeAction, UserAction } from '@app/auth/store';
import { MatDialog } from '@angular/material/dialog';
import { PasswordResetComponent } from '@app/auth/components/password-reset/password-reset.component';
import { PersonalInfoService } from '@shared/services/personal-info/personal-info.service';
import { NotificationsService } from '@app/shared/services/notifications/notifications.service';
import { NotificationSuccess } from '@app/shared/constants/notification-success.enum';

@Injectable()
export class ControllerService {
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);
  private readonly personalInfoService = inject(PersonalInfoService);
  private readonly notificationService = inject(NotificationsService);

  rememberMe = this.store.selectSnapshot(AuthState.getRememberMe);

  cancel() {
    this.router.navigate(['/auth']);
  }

  signUp(personalData: NewUserInfo): Observable<SignupResponse> {
    return this.api.signUp(personalData);
  }

  login(credentials: LoginInformation): Observable<void> {
    return this.authService.login(credentials);
  }

  openResetPasswordModal(email?: string) {
    this.dialog
      .open(PasswordResetComponent, {
        width: '318px',
        autoFocus: false,
        data: email,
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((email) => this.api.resetPassword(email)),
      )
      .subscribe(() => {
        this.notificationService.openSuccess(NotificationSuccess.PasswordSent);
      });
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
}
