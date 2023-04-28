import { Component, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateRangeData, UnavailableDates } from '../../models';
import { DateRangeController } from '../../services';

@Component({
  selector: 'lc-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeComponent {
  @Input() selectedRangeValue!: DateRange<Date> | null;

  readonly maxRentalPeriod = 10;
  readonly day = new Date().getDate();
  readonly month = new Date().getMonth();
  readonly year = new Date().getFullYear();

  dateRangeForm = new FormGroup({
    fromDate: new FormControl(null),
    toDate: new FormControl(null),
  });

  minDate = new Date();
  maxDate = new Date(this.year + 1, this.month, this.day - 1);

  private unavailableDates: UnavailableDates[] = this.dateRangeData.unavailableDates;

  constructor(@Inject(MAT_DIALOG_DATA) public dateRangeData: DateRangeData, private controller: DateRangeController) {}

  isDateUnavailable = (dateFromCalendar: Date): boolean => {
    const timeUnixFromCalendar = dateFromCalendar.setHours(0, 0, 0, 0);

    if (!this.unavailableDates) return true;

    return !this.unavailableDates.find((unavailableDate) => {
      return (
        new Date(unavailableDate.start_date).setHours(0, 0, 0, 0) >= timeUnixFromCalendar &&
        new Date(unavailableDate.end_date).setHours(0, 0, 0, 0) <= timeUnixFromCalendar
      );
    });
  };

  selectedDateRange(selectedDate: Date | null) {
    if (!selectedDate) return;

    const selectedUTCDate = this.getUTCTime(selectedDate);

    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
      return this.setStartDate(selectedUTCDate);
    }

    if (!selectedUTCDate) return;

    if (selectedUTCDate < this.selectedRangeValue.start) {
      return this.setStartDate(selectedUTCDate);
    }

    const fromDate = new Date(this.selectedRangeValue.start);
    fromDate.setDate(fromDate.getDate() + this.maxRentalPeriod - 1);

    if (!this.isPeriodAvailable(this.selectedRangeValue.start, selectedUTCDate)) {
      return this.setStartDate(selectedUTCDate);
    }

    this.selectedRangeValue = new DateRange<Date>(this.selectedRangeValue.start, selectedUTCDate);
  }

  resetMaxDate() {
    this.maxDate = new Date(this.year + 1, this.month, this.day - 1);
    this.selectedRangeValue = new DateRange<Date>(null, null);
  }

  private getUTCTime(date: Date): Date {
    const timeZone = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    return new Date(timeZone);
  }

  private isPeriodAvailable(start: Date, end: Date): boolean {
    if (!this.unavailableDates) return true;

    for (let i = 0; i < this.unavailableDates.length; i++) {
      if (new Date(this.unavailableDates[i].start_date) > start && new Date(this.unavailableDates[i].end_date) < end) {
        return false;
      }
    }
    return true;
  }

  private setStartDate(date: Date) {
    this.selectedRangeValue = new DateRange<Date>(date, null);
    this.setMaxDate(date);
  }

  private setMaxDate(date: Date) {
    const lastPeriodOfTheYear = new Date(this.year + 1, this.month, this.day - this.maxRentalPeriod);

    if (date > lastPeriodOfTheYear) return;

    const endDate = new Date(date);

    endDate.setDate(endDate.getDate() + this.maxRentalPeriod - 1);
    this.maxDate = new Date(endDate);
  }
}
