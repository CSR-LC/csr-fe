import { Injectable } from '@angular/core';
import { UnavailableDates } from '@app/features/date-range/models';
import { toZonedTime } from 'date-fns-tz';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private readonly timezone = 'Europe/Moscow';

  get date(): Date {
    return toZonedTime(new Date(), this.timezone);
  }

  get currentYear(): number {
    return this.date.getFullYear();
  }

  get currentMonth(): number {
    return this.date.getMonth();
  }

  get currentDate(): number {
    return this.date.getDate();
  }

  removeTime(date: Date | string): number {
    return new Date(date).setHours(0, 0, 0, 0);
  }

  isDateInPeriod(date: Date, period: UnavailableDates): boolean {
    const startUnavailable = new Date(period.start_date);
    const endUnavailable = new Date(period.end_date);
    const dateTime = date.getTime();
    return date >= startUnavailable && date <= endUnavailable;
  }
}
