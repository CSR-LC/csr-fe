import { Injectable } from '@angular/core';
import { EmailConfirmationApi } from '../api/email-confirmation-api';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { NotificationsService } from '@app/shared/services/notifications/notifications.service';
import { NotificationSuccess } from '@app/shared/constants/notification-success.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalInfoService } from '@app/shared/services/personal-info/personal-info.service';
import { InfoService } from '@app/shared/services/info/info.service';
import { User } from '@app/auth/models';

@Injectable()
export class EmailConfirmationController {
  constructor(
    private readonly store: Store,
    private readonly api: EmailConfirmationApi,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationsService,
    private readonly personalInfoService: PersonalInfoService,
    private readonly infoService: InfoService,
    private readonly router: Router,
  ) {}

  get user(): User | undefined {
    const store = this.store.snapshot().auth;
    return store ? store.user : undefined;
  }

  get userMail(): string | undefined {
    return this.user ? this.user.email : undefined;
  }

  get userLogin(): string | undefined {
    return this.user ? this.user.login : undefined;
  }

  get emailconfirmationToken(): string | undefined {
    return this.activatedRoute.snapshot.params['token'];
  }

  confirmMail(token: string): Observable<unknown> {
    return this.api.confirmMail(token);
  }

  resendConfirmationLetter(): Observable<string | null> {
    return this.userLogin ? this.api.resendConfirmationLetter(this.userLogin) : of(null);
  }

  resendMailSuccess() {
    this.notificationService.openError(NotificationSuccess.EmailConfirmationMailResent);
  }

  openPersonalInfoModal(): Observable<void> {
    return this.personalInfoService.openPersonalInfoModal();
  }

  navigateToApplication() {
    this.router.navigate(['/']);
  }

  openEmailConfirmedModal(): Observable<boolean | null> {
    return this.infoService.openInfoModal({
      headerText: 'Почта подтверждена',
      infoMessage: `Вы успешно зарегистрировались`,
      buttonOkText: 'Продолжить',
    });
  }
}
