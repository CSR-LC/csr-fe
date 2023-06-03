import { Component, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateRangeData, UnavailableDates } from '../../models';

@Component({
  selector: 'lc-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeComponent {
  @Input() selectedRangeValue!: DateRange<Date> | null;

  readonly maxRentalPeriod: number = this.dateRangeData.maxRentalPeriod;
  readonly currentDay = new Date().getDate();
  readonly currentMonth = new Date().getMonth();
  readonly currentYear = new Date().getFullYear();

  dateRangeForm = new FormGroup({
    fromDate: new FormControl(null),
    toDate: new FormControl(null),
  });

  minDate = new Date();
  maxDate = new Date(this.currentYear + 1, this.currentMonth, this.currentDay - 1);

  private unavailableDates: UnavailableDates[] = this.dateRangeData.unavailableDates;

  constructor(@Inject(MAT_DIALOG_DATA) public dateRangeData: DateRangeData) {}

  isDateUnavailable = (dateFromCalendar: Date): boolean => {
    const timeUnixFromCalendar = this.removeTime(dateFromCalendar);

    if (!this.unavailableDates) return true;

    return !this.unavailableDates.find((unavailableDate) => {
      return (
        this.removeTime(unavailableDate.start_date) <= timeUnixFromCalendar &&
        this.removeTime(unavailableDate.end_date) >= timeUnixFromCalendar
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

  getSelectedRentalDate(dateRange: DateRange<Date> | null): UnavailableDates | undefined {
    if (!dateRange?.start || !dateRange.end) return;

    return {
      end_date: dateRange.end.toISOString(),
      start_date: dateRange.start.toISOString(),
    };
  }

  resetSelectedPeriod() {
    this.maxDate = new Date(this.currentYear + 1, this.currentMonth, this.currentDay - 1);
    this.selectedRangeValue = new DateRange<Date>(null, null);
  }

  private removeTime(date: Date | string): number {
    return new Date(date).setHours(0, 0, 0, 0);
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
    const lastPeriodOfTheYear = new Date(
      this.currentYear + 1,
      this.currentMonth,
      this.currentDay - this.maxRentalPeriod,
    );

    if (date > lastPeriodOfTheYear) return;

    const endDate = new Date(date);

    endDate.setDate(endDate.getDate() + this.maxRentalPeriod - 1);
    this.maxDate = new Date(endDate);
  }
}
