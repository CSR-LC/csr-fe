import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { EmailConfirmationController } from '../servicves/controller/email-confirmation-controller';
import { EmailConfirmationApi } from '../servicves/api/email-confirmation-api';
import { CommonModule } from '@angular/common';
import { catchError, switchMap, finalize } from 'rxjs';

@Component({
  standalone: true,
  imports: [SharedModule, CommonModule],
  providers: [EmailConfirmationController, EmailConfirmationApi],
  selector: 'lc-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailConfirmationComponent implements OnInit {
  userEmail?: string;
  token?: string;
  isTokenValid: boolean = true;

  constructor(private readonly controller: EmailConfirmationController, private readonly cdr: ChangeDetectorRef) {}

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
