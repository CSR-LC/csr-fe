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
