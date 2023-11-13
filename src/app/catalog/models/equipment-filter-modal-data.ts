import { BaseKind, PetSize } from '@app/shared/models/management';
import { EquipmentFilterForm } from './equipment-filter-form';

export type EquipmentFilterModalData = {
  equipmentFilterForm: EquipmentFilterForm;
  petKinds: BaseKind[];
  petSizes: PetSize[];
};
