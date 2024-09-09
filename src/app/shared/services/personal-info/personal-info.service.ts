import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonalInfoModalComponent } from '@shared/components/personal-info-modal/personal-info-modal.component';
import { filter, Observable, switchMap } from 'rxjs';
import { ApiService } from '@app/auth/services/api/api.service';
import { UserPersonalInfo } from '@app/shared/constants/personal-info';
import { Store } from '@ngxs/store';
import { UserAction } from '@app/auth/store';
import { ChangeEmailModalComponent } from '@shared/components/change-email-modal/change-email-modal.component';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoService {
  constructor(private readonly dialog: MatDialog, private readonly api: ApiService, private readonly store: Store) {}

  openPersonalInfoModal(contactInfo?: UserPersonalInfo): Observable<void> {
    return this.dialog
      .open(PersonalInfoModalComponent, {
        autoFocus: false,
        data: contactInfo,
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((contactInfo: UserPersonalInfo) => {
          return this.api.addContactInfo(contactInfo);
        }),
        switchMap(() => this.updateUserPersonalInfo()),
      );
  }

  public changeEmail(email: string): Observable<void> {
    return this.openChangeEmailModal(email).pipe(
      filter(Boolean),
      switchMap((email: string) => {
        return this.api.changeEmail(email);
      }),
      switchMap(() => this.updateUserPersonalInfo()),
    );
  }

  public deleteUserProfile() {
    return this.openDeleteProfileModal().pipe(
      filter(Boolean),
      switchMap(() => {
        return this.api.deleteProfile();
      }),
    );
  }

  updateUserPersonalInfo(): Observable<void> {
    return this.api.getCurrentUser().pipe(
      switchMap((user) => {
        return this.store.dispatch(new UserAction(user));
      }),
    );
  }

  private openDeleteProfileModal(): Observable<boolean> {
    return this.dialog
      .open(ConfirmationModalComponent, {
        autoFocus: false,
        data: {
          title: 'Удаление профиля',
          body: 'Вы уверены, что хотите удалить профиль?',
          applyButtonText: 'Подтвердить',
          cancelButtonText: 'Отменить',
        },
      })
      .afterClosed();
  }

  private openChangeEmailModal(email: string): Observable<string | false> {
    return this.dialog
      .open(ChangeEmailModalComponent, {
        autoFocus: false,
        data: email,
      })
      .afterClosed();
  }
}
