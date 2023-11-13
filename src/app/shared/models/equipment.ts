import { TechnicalIssues } from '../types/technical-issues';
import { EquipmentOptions } from '@app/shared/models/management';

export class NewEquipment {
  category: number;
  subCategory?: number;
  compensationCost: number;
  condition?: string;
  description: string;
  inventoryNumber: number;
  location: number;
  maximumDays: number;
  name: string;
  nameSubstring?: string;
  petKinds: number[];
  petSize: number;
  photoID: string;
  receiptDate: number;
  status: number;
  supplier: string;
  technicalIssues: boolean;
  termsOfUse: string;
  title: string;

  constructor(equipment: EquipmentOptions) {
    this.category = equipment.category;
    this.compensationCost = equipment.compensationCost;
    this.description = equipment.description;
    this.inventoryNumber = equipment.inventoryNumber;
    this.location = equipment.location;
    this.maximumDays = equipment.maximumDays;
    this.name = equipment.name;
    this.petKinds = equipment.petKinds;
    this.petSize = equipment.petSize;
    this.photoID = equipment.photoID;
    this.receiptDate = this.getDate(equipment.receiptDate);
    this.status = equipment.status;
    this.supplier = equipment.supplier;
    this.technicalIssues = equipment.technicalIssues === TechnicalIssues.is;
    this.termsOfUse = equipment.termsOfUse;
    this.title = equipment.title;
    this.subCategory = equipment.subCategory;

    this.nameSubstring = 'str';

    if (equipment.condition) {
      this.condition = equipment.condition;
    }

    if (equipment.nameSubstring) {
      this.nameSubstring = equipment.nameSubstring;
    }
  }

  private getDate(date: Date): number {
    return Number(`${date.getTime()}`.slice(0, -3));
  }
}
