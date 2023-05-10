import { UnavailableDates } from '.';

export type DateRangeData = {
  headerText: string;
  buttonText: string;
  maxRentalPeriod: number;
  unavailableDates: UnavailableDates[];
};
