import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonalInfoModalComponent } from '@shared/components/personal-info-modal/personal-info-modal.component';
import { Observable, of, switchMap } from 'rxjs';
import { ApiService } from '@app/auth/services/api/api.service';
import { UserPersonalInfo } from '@app/shared/constants/personal-info';

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoService {
  constructor(private readonly dialog: MatDialog, private readonly api: ApiService) {}

  openPersonalInfoModal(): Observable<void> {
    return this.dialog
      .open(PersonalInfoModalComponent, {
        width: '100vw',
        maxWidth: '100vw',
        autoFocus: false,
        position: { bottom: '0' },
      })
      .afterClosed()
      .pipe(
        switchMap((contactInfo: UserPersonalInfo | false) => {
          if (contactInfo) {
            return this.api.addContactInfo(contactInfo);
          } else {
            return of(undefined);
          }
        }),
      );
  }
}
