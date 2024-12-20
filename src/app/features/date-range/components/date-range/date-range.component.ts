import { Component, ChangeDetectionStrategy, Input, OnInit, inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DateRange, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateRangeData, UnavailableDates } from '../../models';
import { DateRangePurpose } from '../../models/date-rrange-purpose';

@Component({
  selector: 'lc-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeComponent implements OnInit {
  dateRangeData = inject<DateRangeData>(MAT_DIALOG_DATA);

  selectedRangeValue!: DateRange<Date> | null;

  readonly maxRentalPeriod: number = this.dateRangeData.maxRentalPeriod;
  readonly cellClassName = 'marked-date';
  readonly currentDay = new Date().getDate();
  readonly currentMonth = new Date().getMonth();
  readonly currentYear = new Date().getFullYear();
  purpose: DateRangePurpose = DateRangePurpose.rent;

  dateRangeForm = new UntypedFormGroup({
    fromDate: new UntypedFormControl(null),
    toDate: new UntypedFormControl(null),
  });

  minDate = new Date();
  maxDate = new Date(this.currentYear + 1, this.currentMonth, this.currentDay - 1);

  private unavailableDates: UnavailableDates[] = this.dateRangeData.unavailableDates;

  ngOnInit() {
    this.purpose = this.dateRangeData.purpose;
    this.selectedRangeValue = this.dateRangeData.selectedPeriod || null;
  }

  isDateUnavailable = (dateFromCalendar: Date): boolean => {
    if (this.purpose === DateRangePurpose.block || !this.unavailableDates) return true;

    return !this.hasIntersection(dateFromCalendar);
  };

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (this.purpose === DateRangePurpose.rent) return '';

    return !!this.hasIntersection(cellDate) ? this.cellClassName : '';
  };

  private hasIntersection(date: Date): undefined | UnavailableDates {
    return this.unavailableDates.find((unavailableDate) => {
      return (
        this.removeTime(unavailableDate.start_date) <= this.removeTime(date) &&
        this.removeTime(unavailableDate.end_date) >= this.removeTime(date)
      );
    });
  }

  selectedDateRange(selectedDate: Date | null) {
    if (!selectedDate) return;

    const selectedUTCDate = new Date(this.removeTime(selectedDate));

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
