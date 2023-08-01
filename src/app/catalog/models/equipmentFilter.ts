import { BaseKind, PetSize } from '@app/management/models/management';
import { EquipmentFilterForm } from '@app/catalog/store';

export type EquipmentFilter = {
  petKinds?: number[];
  petSize?: number[];
  technicalIssues?: boolean;
};

export type EquipmentFilterFormModel = {
  idealCondition: boolean;
  petKinds: boolean[];
  petSizes: boolean[];
};

export type EquipmentFilterModalData = {
  equipmentFilterForm: EquipmentFilterForm;
  petKinds: BaseKind[];
  petSizes: PetSize[];
};

export type EquipmentFilterRequest = EquipmentFilter & {
  name_substring?: string;
  category?: number;
};
