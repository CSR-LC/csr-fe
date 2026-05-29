import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateService {
  // Handles both nanoseconds (new backend format) and ISO strings (legacy DB values)
  fromNanoseconds(ns: number | string): Date {
    if (typeof ns === 'string') return new Date(ns);
    return new Date(Math.round(ns / 1e6));
  }

  // Normalizes to UTC midnight so the stored date is timezone-independent
  toNanoseconds(date: Date): number {
    const utcMidnight = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    return Math.floor(utcMidnight / 1000) * 1e9;
  }
}
