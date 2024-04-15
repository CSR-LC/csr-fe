import { TechnicalIssues } from '../types/technical-issues';

export interface BaseKind {
  id: number;
  name: string;
}

export interface EquipmentKind extends BaseKind {
  max_reservation_time: number;
  max_reservation_units: number;
}

export interface PetSize extends BaseKind {
  size: string;
  is_universal?: boolean;
}

export type EquipmentOptions = {
  category: number;
  subCategory: number;
  compensationCost: number;
  condition: string | null;
  description: string;
  inventoryNumber: number;
  location: number;
  maximumDays: number;
  name: string;
  nameSubstring: string | null;
  petKinds: number[];
  petSize: number;
  photoID: string;
  receiptDate: Date;
  status: number;
  supplier: string;
  technicalIssues: TechnicalIssues;
  termsOfUse: string;
  title: string;
};
