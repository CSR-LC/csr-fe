import { Equipment } from './equipment';
import { EquipmentFilterForm } from './equipment-filter-form';
import { EquipmentFilter } from './equipment-filter';

export type Catalog = {
  equipments: Equipment[];
  selectedCategoryId: number;
  equipmentFilterForm: EquipmentFilterForm;
  equipmentFilter: EquipmentFilter;
  searchInput: string;
};
