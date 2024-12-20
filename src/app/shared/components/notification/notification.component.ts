import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
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
  data = inject<NotificationData>(MAT_SNACK_BAR_DATA);
  private snackRef = inject<MatSnackBarRef<NotificationComponent>>(MatSnackBarRef);

  readonly notificationTypes = NotificationTypes;

  dismiss() {
    this.snackRef.dismiss();
  }
}
