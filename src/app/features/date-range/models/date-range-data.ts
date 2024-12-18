import { UnavailableDates } from '.';
import { DateRangePurpose } from './date-range-purpose';
import { DateRange } from '@angular/material/datepicker';

export type DateRangeData = {
  headerText: string;
  buttonText: string;
  maxRentalPeriod: number;
  unavailableDates: UnavailableDates[];
  purpose: DateRangePurpose;
  selectedPeriod?: DateRange<Date>;
};
