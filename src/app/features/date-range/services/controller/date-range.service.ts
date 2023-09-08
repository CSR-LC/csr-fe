import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, switchMap } from 'rxjs';
import { DateRangeComponent } from '../../components/date-range/date-range.component';
import { DateRangeData, UnavailableDates } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class DateRangeService {
  constructor(private dialog: MatDialog) {}

  openDateRangeModal(dateRangeData: DateRangeData): Observable<UnavailableDates | null> {
    return this.dialog
      .open(DateRangeComponent, {
        data: dateRangeData,
        width: '390px',
        maxWidth: '390px',
        autoFocus: false,
      })
      .afterClosed()
      .pipe(
        switchMap((period: UnavailableDates | null) => {
          return period ? of(period) : of(null);
        }),
      );
  }
}
