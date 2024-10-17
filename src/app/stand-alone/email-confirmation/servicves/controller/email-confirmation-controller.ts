import { DestroyRef, Injectable } from '@angular/core';
import { EmailConfirmationApi } from '../api/email-confirmation-api';
import { Store } from '@ngxs/store';
import { filter, Observable, of, tap } from 'rxjs';
import { NotificationsService } from '@app/shared/services/notifications/notifications.service';
import { NotificationSuccess } from '@app/shared/constants/notification-success.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalInfoService } from '@app/shared/services/personal-info/personal-info.service';
import { InfoService } from '@app/shared/services/info/info.service';
import { User } from '@app/auth/models';
import { BlockUiService } from '@app/shared/services/block-ui/block-ui.service';
import { UserPersonalInfo } from '@shared/constants/personal-info';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { AuthService } from '@shared/services/auth-service/auth-service.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    private readonly blockUiService: BlockUiService,
    private mainPageHeaderService: MainPageHeaderService,
    private readonly authService: AuthService,
    private readonly destroyRef: DestroyRef,
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
    this.notificationService.openSuccess(NotificationSuccess.EmailConfirmationMailResent);
  }

  openPersonalInfoModal(contactInfo?: UserPersonalInfo): Observable<void> {
    return this.personalInfoService
      .openPersonalInfoModal(contactInfo)
      .pipe(tap(() => this.notificationService.openSuccess('Персональные данные обновлены')));
  }

  changeEmail(email: string): Observable<void> {
    return this.personalInfoService
      .changeEmail(email)
      .pipe(
        tap(() => this.notificationService.openInfo('Подтвердите новый адрес эл. почты, перейдя по ссылке в письме.')),
      );
  }

  deleteUserProfile(): Observable<void> {
    return this.personalInfoService
      .deleteUserProfile()
      .pipe(tap(() => this.notificationService.openSuccess('Профиль успешно удалён')));
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

  bockUi() {
    this.blockUiService.block();
  }

  unblockUi() {
    this.blockUiService.unBlock();
  }

  setPageTitle() {
    this.mainPageHeaderService.setPageTitle('Профиль');
  }

  logout() {
    this.authService
      .openLogoutConfirmationModal()
      .pipe(filter(Boolean), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.authService.logout();
        this.authService.navigateToLogin();
      });
  }
}
