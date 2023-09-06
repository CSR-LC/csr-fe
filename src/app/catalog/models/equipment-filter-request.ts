import { EquipmentFilter } from './equipment-filter';

export type EquipmentFilterRequest = EquipmentFilter & {
  name_substring?: string;
  category?: number;
};
