import { TableRow } from '@app/shared/models';
import { Equipment } from '@app/catalog/models/equipment';

export type EquipmentRows = {
  active: TableRow<Equipment>[];
  archived: TableRow<Equipment>[];
};
