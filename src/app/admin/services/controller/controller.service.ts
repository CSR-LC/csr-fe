import { Injectable } from '@angular/core';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ArchiveEquipmentModalComponent } from '@app/admin/components/archive-equipment-modal/archive-equipment-modal.component';
import { BlockEquipmentModalComponent } from '@app/admin/components/block-equipment-modal./block-equipment-modal.component';
import { ModalEnum } from '@app/admin/constants/modal.enum';
import { EquipmentMock } from '@app/admin/mocks/admin-equipment.mock';
import { AdminApi } from '@app/admin/services';
import { Observable } from 'rxjs';
import { Equipment } from '@app/catalog/models/equipment';

@Injectable()
export class ControllerService {
  constructor(private dialog: MatDialog, private api: AdminApi) {}
  openArchiveConfirmation() {
    this.dialog
      .open(ConfirmationModalComponent, {
        maxWidth: 472,
        minWidth: 472,
        autoFocus: false,
        data: {
          title: ModalEnum.ArchiveTitle,
          users: [],
          reason: ModalEnum.ArchiveReason,
          applyButtonText: ModalEnum.ArchiveApplyButtonText,
        },
      })
      .afterClosed();
  }

  openBlockConfirmation() {
    this.dialog
      .open(ConfirmationModalComponent, {
        maxWidth: 472,
        minWidth: 472,
        autoFocus: false,
        data: {
          title: ModalEnum.BlockTitle,
          users: [],
          reason: ModalEnum.BlockReason,
          applyButtonText: ModalEnum.BlockApplyButtonText,
        },
      })
      .afterClosed();
  }

  openArchiveEquipmentModal() {
    this.dialog
      .open(ArchiveEquipmentModalComponent, {
        maxWidth: 472,
        minWidth: 472,
        autoFocus: false,
        data: { ...EquipmentMock[0] },
      })
      .afterClosed();
  }
  openBlockEquipmentModal() {
    this.dialog
      .open(BlockEquipmentModalComponent, {
        maxWidth: 472,
        minWidth: 472,
        autoFocus: false,
        data: { ...EquipmentMock[0] },
      })
      .afterClosed();
  }
  fetchEquipments(): Observable<Equipment[]> {
    return this.api.getAllEquipment();
  }
}
