import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonalInfo } from '@shared/constants/personal-info.enum';
import { PersonalInfoModalComponent } from '@shared/components/personal-info-modal/personal-info-modal.component';
import { UserPersonalInfo } from '@shared/constants/personal-info';
import { catchError, filter, switchMap, throwError } from 'rxjs';
import { ApiService } from '@app/auth/services/api/api.service';
import { NotificationsService } from '@shared/services/notifications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoService {
  constructor(
    private readonly dialog: MatDialog,
    private readonly api: ApiService,
    private readonly notificationsService: NotificationsService,
  ) {}

  openPersonalInfoModal(source: PersonalInfo) {
    const data: UserPersonalInfo = {
      name: '',
      surname: '',
      phoneNumber: '',
      source,
    };

    this.dialog
      .open(PersonalInfoModalComponent, {
        height: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        position: { top: '0' },
        data,
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((data) => this.api.addContactInfo(data)),
        catchError((error) => {
          this.notificationsService.openError(error.message);
          return throwError(error);
        }),
      )
      .subscribe();
  }
}
