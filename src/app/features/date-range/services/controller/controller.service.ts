import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { filter, of, switchMap, tap } from 'rxjs';
import { DateRangeApi } from '..';
import { DateRangeComponent } from '../../components/date-range/date-range.component';
import { UnavailableDates } from '../../models';

@UntilDestroy
@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  constructor(private api: DateRangeApi, private dialog: MatDialog) {}

  getUnavailablePeriods(equipmentId?: number) {
    this.api
      .getUnavailablePeriods(equipmentId)
      .pipe(
        tap((periods) => this.openDateRangeModal(periods.items, equipmentId)),
        untilDestroyed(this),
      )
      .subscribe();
  }

  openDateRangeModal(unavailableDates: UnavailableDates[], equipmentId?: number) {
    const dateRangeData = {
      headerText: 'Период аренды',
      buttonText: 'Подтвердить период аренды',
      unavailableDates,
    };

    this.dialog
      .open(DateRangeComponent, {
        data: dateRangeData,
        width: '390px',
        maxWidth: '390px',
        autoFocus: false,
        position: { bottom: '0px' },
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((period: UnavailableDates) => of(period, equipmentId)),
      )
      .subscribe();
  }
}
