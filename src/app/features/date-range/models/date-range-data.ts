import { UnavailableDates } from '.';
import { DateRangePurpose } from './date-rrange-purpose';

export type DateRangeData = {
  headerText: string;
  buttonText: string;
  maxRentalPeriod: number;
  unavailableDates: UnavailableDates[];
  purpose: DateRangePurpose;
};
