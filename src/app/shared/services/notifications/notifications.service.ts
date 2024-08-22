import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import { NotificationTypes } from '@shared/constants/notification.enum';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { HttpErrorResponse } from '@angular/common/http';
import { notificationMessages } from '@app/shared/constants/notification-messages';
import { DefaultResponseError } from '@app/shared/models/default-response-error';
import { ResponseError } from '@app/shared/models/response-error';
import { Router } from '@angular/router';
import { AppRoutes } from '@app/shared/constants/routes.enum';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly config: MatSnackBarConfig = {
    verticalPosition: 'top',
    horizontalPosition: 'center',
  };
  private readonly durationTime = 5000;

  constructor(private readonly router: Router, private readonly notification: MatSnackBar) {}

  openError(message: string) {
    const config = {
      ...this.config,
      data: {
        type: NotificationTypes.Error,
        message,
      },
    };
    this.notification.openFromComponent(NotificationComponent, config);
  }

  openWarning(message: string) {
    const config = {
      ...this.config,
      data: {
        type: NotificationTypes.Warning,
        message,
      },
      duration: this.durationTime,
    };
    this.notification.openFromComponent(NotificationComponent, config);
  }

  openSuccess(message: string) {
    const config = {
      ...this.config,
      data: {
        type: NotificationTypes.Success,
        message,
      },
      duration: this.durationTime,
    };
    this.notification.openFromComponent(NotificationComponent, config);
  }

  openInfo(message: string) {
    const config = {
      ...this.config,
      data: {
        type: NotificationTypes.Info,
        message,
      },
      duration: this.durationTime,
    };
    this.notification.openFromComponent(NotificationComponent, config);
  }

  handleErrorResponse(response: HttpErrorResponse) {
    if (response.status === 403) {
      this.router.navigate([`${AppRoutes.Forbidden}`]);
      return;
    }
    const key = this.getKeyFromError(response.error);
    const message = this.getNotificationMessage(key);
    this.openError(message);
  }

  private getKeyFromError(error: string | ResponseError | DefaultResponseError): string | undefined {
    if (typeof error === 'string') return error;
    return (error as ResponseError).message || (error as DefaultResponseError).data?.message;
  }

  private getNotificationMessage(key: string | undefined): string {
    if (!key || !notificationMessages[key]) return notificationMessages['default'];
    return notificationMessages[key];
  }
}
