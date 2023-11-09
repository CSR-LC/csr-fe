import { Equipment } from '@app/catalog/models/equipment';
import { BaseKind, PetSize, EquipmentKind } from '@app/shared/models/management';

export type EquipmentMOdalData = {
  equipment: Equipment;
  inventoryNumbers: undefined | number[];
  petKinds: BaseKind[] | undefined;
  petSizes: PetSize[] | undefined;
  categories: EquipmentKind[] | undefined;
  equipmentIds: number[] | undefined;
};
