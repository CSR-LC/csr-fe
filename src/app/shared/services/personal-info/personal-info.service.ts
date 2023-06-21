import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonalInfoModalComponent } from '@shared/components/personal-info-modal/personal-info-modal.component';
import { Observable, of, switchMap } from 'rxjs';
import { ApiService } from '@app/auth/services/api/api.service';
import { UserPersonalInfo } from '@app/shared/constants/personal-info';
import { Store } from '@ngxs/store';
import { UserAction } from '@app/auth/store';

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoService {
  constructor(private readonly dialog: MatDialog, private readonly api: ApiService, private readonly store: Store) {}

  openPersonalInfoModal(): Observable<void> {
    return this.dialog
      .open(PersonalInfoModalComponent, {
        width: '100vw',
        maxWidth: '100vw',
        autoFocus: false,
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
        switchMap(() => this.updateUserPersonalInfo()),
      );
  }

  updateUserPersonalInfo(): Observable<void> {
    return this.api.getCurrentUser().pipe(
      switchMap((user) => {
        return this.store.dispatch(new UserAction(user));
      }),
    );
  }
}
