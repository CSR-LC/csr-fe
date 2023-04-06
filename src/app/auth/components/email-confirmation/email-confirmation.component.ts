import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ControllerService } from '@app/auth/services/controller/controller.service';
import { NotificationsService } from '@shared/services/notifications/notifications.service';
import { NotificationSuccess } from '@shared/constants/notification-success.enum';
import { DataService } from '@app/auth/services/data/data.service';
import { switchMap, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { Router } from '@angular/router';

@UntilDestroy
@Component({
  selector: 'lc-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ControllerService],
})
export class EmailConfirmationComponent implements OnInit {

  login: string = '';

  constructor(
    private readonly controller: ControllerService,
    private readonly notificationsService: NotificationsService,
    private readonly dataService: DataService,
    private readonly router: Router,
  ) {}
  
  ngOnInit(): void {
    this.dataService.data$.pipe(
      tap((data) => this.login = data),
      switchMap((data) => this.controller.sendConfirmationEmail(data)),
      untilDestroyed(this)
    ).subscribe(() => {
      this.notificationsService.openSuccess(NotificationSuccess.EmailSent);
    });
  }

  reSendEmail(): void {
    this.controller.sendConfirmationEmail(this.login).subscribe(
      (response: string) => {
        this.notificationsService.openSuccess(NotificationSuccess.ReEmailSent);
      },
    );
  }
  
  backLoginPage(): void {
    this.router.navigate(['/auth'])
  }
}
