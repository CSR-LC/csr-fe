import { Injectable } from '@angular/core';
import { BaseKind, EquipmentKind, PetSize } from '@app/management/models/management';
import { Store } from '@ngxs/store';
import { EquipmentModal } from '@app/admin/constants/equipment-modal.enum';
import { Equipment } from '@app/catalog/models/equipment';

@Injectable()
export class EquipmentModalService {
  constructor(readonly store: Store) {}

  get petKinds(): BaseKind[] {
    const items = this.store.snapshot().application_data.petKinds;
    return items ? items : [];
  }

  get petSizes(): PetSize[] {
    const items = this.store.snapshot().application_data.petSizes;
    return items ? items : [];
  }

  get categories(): EquipmentKind[] {
    const items = this.store.snapshot().application_data.equipmentCategories;
    return items ? items : [];
  }

  getHeaderText(equipment?: Equipment): string {
    return equipment ? EquipmentModal.EditEquipmentHeader : EquipmentModal.AddEquipmentHeader;
  }

  getActionButtonText(equipment?: Equipment): string {
    return equipment ? EquipmentModal.EditEquipmentModalButtonText : EquipmentModal.AddEquipmentModalButtonText;
  }
}
