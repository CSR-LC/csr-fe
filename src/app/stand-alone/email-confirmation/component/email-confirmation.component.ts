import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { EmailConfirmationController } from '../servicves/controller/email-confirmation-controller';
import { EmailConfirmationApi } from '../servicves/api/email-confirmation-api';

import { catchError, switchMap, finalize } from 'rxjs';

@Component({
  standalone: true,
  imports: [SharedModule],
  providers: [EmailConfirmationController, EmailConfirmationApi],
  selector: 'lc-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailConfirmationComponent implements OnInit {
  private readonly controller = inject(EmailConfirmationController);
  private readonly cdr = inject(ChangeDetectorRef);

  userEmail?: string;
  token?: string;
  isTokenValid: boolean = true;

  ngOnInit() {
    this.userEmail = this.controller.userMail;
    this.token = this.controller.emailconfirmationToken;

    if (this.token) this.confirmMail();
  }

  confirmMail() {
    if (!this.token) return;
    this.controller.bockUi();
    this.controller
      .confirmMail(this.token)
      .pipe(
        switchMap(() => this.controller.openEmailConfirmedModal()),
        switchMap(() => this.controller.openPersonalInfoModal()),
        finalize(() => this.controller.unblockUi()),
        catchError((err) => {
          this.isTokenValid = false;
          this.cdr.markForCheck();
          throw new Error(err);
        }),
      )
      .subscribe(() => {
        this.controller.navigateToApplication();
      });
  }

  resendMail() {
    this.controller.resendConfirmationLetter().subscribe((res) => {
      if (res) this.controller.resendMailSuccess();
    });
  }
}
