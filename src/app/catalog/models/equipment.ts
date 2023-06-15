// necessary to be corrected
export type Equipment = {
  category: number;
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
  subcategory: number;
  supplier: string;
  technicalIssues: boolean;
  termsOfUse: string;
  title: string;
};

export type EquipmentAvailability = {
  endDate: Date;
  startDate: Date;
};
