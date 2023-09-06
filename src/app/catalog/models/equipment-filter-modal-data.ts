import { BaseKind, PetSize } from '@app/management/models/management';
import { EquipmentFilterForm } from './equipment-filter-form';

export type EquipmentFilterModalData = {
  equipmentFilterForm: EquipmentFilterForm;
  petKinds: BaseKind[];
  petSizes: PetSize[];
};
