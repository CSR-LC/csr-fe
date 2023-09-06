import { EquipmentFilter } from '@app/catalog/models/equipment-filter';
import { EquipmentFilterForm } from '@app/catalog/models/equipment-filter-form';

export interface FilterModalResult {
  equipmentFilter: EquipmentFilter | EquipmentFilterForm;
  isFormState: boolean;
}
