export type Equipment = {
  category: number;
  compensationCost: number;
  condition: string;
  description: string;
  inventoryNumber: number;
  id: number;
  kind: number;
  location: number | null;
  maximumAmount: number;
  maximumDays: number;
  name: string;
  name_substring: string;
  order: number;
  photo: string;
  photoID: string;
  receiptDate: string;
  status: number;
  supplier: string;
  title: string;
  technicalIssues: boolean;
};

export type EquipmentAvailability = {
  endDate: Date;
  startDate: Date;
};
