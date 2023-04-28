export type UnavailableDates = {
  end_date: string;
  start_date: string;
};

export type UnavailablePeriods = {
  items: UnavailableDates[];
};
