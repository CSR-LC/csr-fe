import { EquipmentFilterFormModel } from './equipment-filter-form-model';

export type EquipmentFilterForm = {
  model: EquipmentFilterFormModel | undefined;
  dirty: boolean | null;
  errors: { [k: string]: string } | null;
  status: string | null;
};
