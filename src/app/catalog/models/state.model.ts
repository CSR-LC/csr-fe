import { Equipment } from './equipment';
import { EquipmentFilterForm } from '@app/catalog/store';
import { EquipmentFilter } from '@app/catalog/models/equipmentFilter';

export type Catalog = {
  equipments: Equipment[];
  selectedCategoryId: number;
  equipmentFilterForm: EquipmentFilterForm;
  equipmentFilter: EquipmentFilter;
  searchInput: string;
};
