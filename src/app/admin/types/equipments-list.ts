import { Equipment } from '@app/catalog/models/equipment';

export type EquipmentLists = {
  active: Equipment[];
  archived: Equipment[];
};
