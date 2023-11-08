import { NewEquipment } from '@app/shared/models/equipment';

export type EquipmentModalResponse = {
  file: File;
  equipment: NewEquipment;
};
