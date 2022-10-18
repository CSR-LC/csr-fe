import {TechnicalIssues} from "@app/management/types";

export interface BaseKind {
  id: number,
  name: string,
}

export interface EquipmentKind extends BaseKind {
    max_reservation_time: number,
    max_reservation_units: number,
}

export interface PetSize extends BaseKind {
  size: string;
}

export type EquipmentOptions = {
  category: number;
  subCategory: number | null;
  compensationCost: number;
  condition: string | null;
  description: string;
  inventoryNumber: number;
  location: number;
  maximumAmount:  number;
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
}

export type EquipmentManagement = {
  name: string,
  title:string,
  description: string,
  nameSubstring: string,
  category: string,
  subCategory: string,
  // TODO: remove russian C in Cost
  compensationСost: number,
  condition: string,
  inventoryNumber: number,
  supplier: string,
  receiptDate: string,
  termsOfUse: string,
  kind: number,
  location: number,
  maximumAmount: number,
  maximumDays: number,
  order: number,
  status: number,
  photo: string,
  petSize: number,
  photoID: string,
  petKinds: number[],
}
