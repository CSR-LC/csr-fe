import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, switchMap } from 'rxjs';
import { DateRangeComponent } from '../../components/date-range/date-range.component';
import { UnavailableDates } from '../../models';
import { PersonalInfoService } from '@app/shared/services/personal-info/personal-info.service';
import { AuthState } from '@app/auth/store';
import { Select } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class DateRangeService {
  @Select(AuthState.hasUserPesonalData) hasUserPesonalData$!: Observable<boolean>;

  constructor(private dialog: MatDialog, private personalInfoService: PersonalInfoService) {}

  openDateRangeModal(
    unavailableDates: UnavailableDates[],
    equipmentId?: number,
    maxRentalPeriod?: number,
  ): Observable<UnavailableDates | null> {
    const dateRangeData = {
      headerText: 'Период аренды',
      buttonText: 'Подтвердить период аренды',
      maxRentalPeriod,
      unavailableDates,
    };

    return this.dialog
      .open(DateRangeComponent, {
        data: dateRangeData,
        width: '390px',
        maxWidth: '390px',
        autoFocus: false,
        position: { bottom: '0px' },
      })
      .afterClosed()
      .pipe(
        switchMap((period: UnavailableDates | null) => {
          return this.addPersonalInfo(period);
        }),
      );
  }

  private addPersonalInfo(period: UnavailableDates | null): Observable<UnavailableDates | null> {
    if (!period) return of(null);

    return this.hasUserPesonalData$.pipe(
      switchMap((isPersonalData) => {
        return !isPersonalData ? this.personalInfoService.openPersonalInfoModal() : of(null);
      }),
      switchMap(() => this.hasUserPesonalData$),
      switchMap((isPersonalData) => {
        return isPersonalData ? of(period) : of(null);
      }),
    );
  }
}
