import { TechnicalIssues } from '@app/management/types';
import { EquipmentOptions } from '@app/management/models/management';

export class NewEquipment {
  category: number;
  subCategory?: number;
  compensationCost: number;
  condition?: string;
  description: string;
  inventoryNumber: number;
  location: number;
  maximumAmount: number;
  maximumDays: number;
  name: string;
  nameSubstring?: string;
  petKinds: number[];
  petSize: number;
  photoID: string;
  receiptDate: string;
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
    this.maximumAmount = equipment.maximumAmount;
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

    if (equipment.subCategory) {
      this.subCategory = equipment.subCategory;
    }

    if (equipment.condition) {
      this.condition = equipment.condition;
    }

    if (equipment.nameSubstring) {
      this.nameSubstring = equipment.nameSubstring;
    }
  }

  private getDate(date: Date): string {
    const day = this.addZero(date.getDate());
    const month = this.addZero(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  private addZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
