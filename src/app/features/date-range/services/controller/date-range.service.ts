import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, switchMap } from 'rxjs';
import { DateRangeComponent } from '../../components/date-range/date-range.component';
import { UnavailableDates } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class DateRangeService {
  constructor(private dialog: MatDialog) {}

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
          if (period) {
            return of(period);
          } else {
            return of(null);
          }
        }),
      );
  }
}
