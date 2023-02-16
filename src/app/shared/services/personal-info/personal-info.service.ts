import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OpenedFrom } from '@shared/constants/personal-info.enum';
import { PersonalInfoModalComponent } from '@shared/components/personal-info-modal/personal-info-modal.component';
import { Observable, of, switchMap } from 'rxjs';
import { ApiService } from '@app/auth/services/api/api.service';
import { UserPersonalInfo } from '@app/shared/constants/personal-info';

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoService {
  constructor(private readonly dialog: MatDialog, private readonly api: ApiService) {}

  openPersonalInfoModal(source: OpenedFrom): Observable<void> {
    return this.dialog
      .open(PersonalInfoModalComponent, {
        height: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        position: { top: '0' },
        data: source,
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
