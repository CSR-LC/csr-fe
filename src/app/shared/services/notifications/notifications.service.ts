import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSnackBarConfig} from "@angular/material/snack-bar/snack-bar-config";
import {NotificationTypes} from "@shared/constants/notification.enum";
import {NotificationComponent} from "@shared/components/notification/notification.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private readonly config: MatSnackBarConfig = {
    verticalPosition: 'top',
    horizontalPosition: 'center',
    duration: 5000
  }

  constructor(private notification: MatSnackBar) { }

  openError(message: string) {
    const config = {
      ...this.config,
      data:
        {
          type:NotificationTypes.Error,
          message
        }
    }
    this.notification.openFromComponent(NotificationComponent, { ...config })
  }

  openWarning(message: string) {
    const config = {
      ...this.config,
      data:
        {
          type:NotificationTypes.Warning,
          message
        }
    }
    this.notification.openFromComponent(NotificationComponent, { ...config })
  }

  openSuccess(message: string) {
    const config = {
      ...this.config,
      data:
        {
          type:NotificationTypes.Success,
          message
        }
    }
    this.notification.openFromComponent(NotificationComponent, { ...config })
  }
}
