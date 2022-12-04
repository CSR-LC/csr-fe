import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationTypes } from '@shared/constants/notification.enum';
import { NotificationData } from '@shared/constants/notification';

@Component({
  selector: 'lc-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {
  readonly notificationTypes = NotificationTypes;
  isCloseBtnVisible = false;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData,
    private _snackRef: MatSnackBarRef<NotificationComponent>,
  ) {}

  ngOnInit(): void {
    if (this.data.type === NotificationTypes.Error) {
      this.isCloseBtnVisible = true;
    }
  }

  dismiss() {
    this._snackRef.dismiss();
  }
}
