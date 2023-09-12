import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
// import { MatLegacySnackBarRef as MatSnackBarRef } from '@angular/material/legacy-snack-bar';
// import { MatSnackBarRef } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationTypes } from '@shared/constants/notification.enum';
import { NotificationData } from '@shared/constants/notification';

@Component({
  selector: 'lc-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  readonly notificationTypes = NotificationTypes;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData,
    private snackRef: MatSnackBarRef<NotificationComponent>,
  ) {}

  dismiss() {
    this.snackRef.dismiss();
  }
}
