import { UnavailableDates } from '@app/features/date-range/models';

// necessary to be corrected
export type Equipment = {
  blockingPeriods: UnavailableDates[] | null;
  category: number;
  categoryName?: string;
  compensationCost: number;
  condition: string;
  description: string;
  id: number;
  inventoryNumber: number;
  location: number;
  maximumDays: number;
  name: string;
  name_substring: string;
  petKinds: {
    name: string;
  }[];
  petSize: number;
  photoID: string;
  receiptDate: number;
  status: number;
  statusName?: string;
  subcategory: number;
  supplier: string;
  technicalIssues: boolean;
  termsOfUse: string;
  title: string;
};
