import { Equipment } from '../models/equipment';
import { EquipmentFilter } from '@app/catalog/models';

export class GetCatalog {
  static readonly type = '[Catalog] Get';
  constructor(public catalog: Equipment[]) {}
}

export class SetSelectedCategoryId {
  static readonly type = '[Catalog] SetSelectedCategoryId';
  constructor(public categoryId: number) {}
}

export class SetSearchInput {
  static readonly type = '[Catalog] SetSearchInput';
  constructor(public searchInput: string) {}
}

export class SetEquipmentFilter {
  static readonly type = '[Catalog] SetEquipmentFilter';
  constructor(public equipmentFilter: EquipmentFilter) {}
}
