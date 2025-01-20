import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, switchMap } from 'rxjs';
import { DateRangeComponent } from '../../components/date-range/date-range.component';
import { DateRangeData, UnavailableDates } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class DateRangeService {
  private dialog = inject(MatDialog);

  openDateRangeModal(dateRangeData: DateRangeData): Observable<UnavailableDates | null> {
    return this.dialog
      .open(DateRangeComponent, {
        minWidth: 320,
        data: dateRangeData,
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
