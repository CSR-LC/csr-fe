import { Injectable } from '@angular/core';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ArchiveEquipmentModalComponent } from '@app/admin/components/archive-equipment-modal/archive-equipment-modal.component';
import { EquipmentModal } from '@app/admin/constants/equipment-modal.enum';
import { AdminApi } from '@app/admin/services';
import { BehaviorSubject, Observable, filter, of, map, switchMap, tap } from 'rxjs';
import { Equipment, EquipmentAvailability } from '@app/catalog/models/equipment';
import { BlockEquipmentModalComponent } from '@app/admin/components/block-equipment-modal/block-equipment-modal.component';
import { Dictionary } from '@app/shared/types';
import { TableAction } from '@shared/models/table-action';
import { EquipmentAction } from '@shared/constants/action.enum';
import { NotificationsService } from '@app/shared/services/notifications/notifications.service';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { OrderNotificationModalComponent } from '@app/admin/components/order-notification-modal/order-notification-modal.component';
import { TableRow } from '@app/shared/models/table-row';

@UntilDestroy
@Injectable()
export class EquipmentController {
  private equipmentDataSubj$ = new BehaviorSubject<TableRow[]>([]);
  categoryDictionary: Dictionary<string> = {};
  statusDictionary: Dictionary<string> = {};

  private readonly commonModalConfig = {
    maxWidth: 472,
    minWidth: 472,
    autoFocus: false,
  };

  get equipmentData$(): Observable<TableRow[]> {
    return this.equipmentDataSubj$.asObservable();
  }

  constructor(private dialog: MatDialog, private api: AdminApi, private notificationService: NotificationsService) {}

  editEquipment(data: TableAction<Equipment>) {
    switch (data.action) {
      case EquipmentAction.Block:
        // eslint-disable-next-line no-console
        console.log(data.action);
        //this.blockEquipment(data.row);
        break;
      case EquipmentAction.Edit:
        // eslint-disable-next-line no-console
        console.log(data.action);
        //this.editEquipment(data.row);
        break;
      case EquipmentAction.Archivate:
        this.archivateEquipment(data);
        break;
    }
  }

  fetchEquipments() {
    return this.api.getAllEquipment().pipe(
      map((res) => this.createRows(res.items)),
      tap((data: TableRow[]) => this.equipmentDataSubj$.next(data)),
    );
  }

  private createRows(equipments: Equipment[]): TableRow[] {
    return equipments.map((equipment) => {
      const categoryName = this.getDictionaryValue(this.categoryDictionary, equipment.category);
      const statusName = this.getDictionaryValue(this.statusDictionary, equipment.status);
      if (categoryName) equipment.categoryName = categoryName;
      if (statusName) equipment.statusName = statusName;
      if (equipment.status === 5) (equipment as TableRow).disableActions = true;
      return equipment;
    });
  }

  private blockEquipment(equipment: Equipment) {
    //todo add new logic
    // let blockPeriod: EquipmentAvailability;
    // this.openBlockEquipmentModal(equipment)
    //   .pipe(
    //     filter(Boolean),
    //     switchMap((period: EquipmentAvailability) => {
    //       blockPeriod = period;
    //       return this.api.getEquipmentAvailable(period);
    //     }),
    //     switchMap((name: string) => (name ? this.openBlockConfirmation(name) : of(true))),
    //     filter(Boolean),
    //     switchMap(() => this.api.blockEquipment(equipment.id, blockPeriod)),
    //     tap(() => this.notificationService.openSuccess(`${equipment.title} было за блокированно!`)),
    //     untilDestroyed(this),
    //     catchError((error) => {
    //       this.notificationService.openError(error);
    //       throw new Error(error);
    //     }),
    //   )
    //   .subscribe();
  }

  private archivateEquipment(data: TableAction<Equipment>) {
    const equipment = data.row;
    this.openArchiveEquipmentModal(equipment)
      .pipe(
        filter(Boolean),
        switchMap(() => this.api.getEquipmentUnavailabilityPeriods(equipment.id)),
        switchMap((res) => {
          return res.items && res.items.length ? this.openOrderNotificationModal(data.action) : of(true);
        }),
        filter(Boolean),
        switchMap(() => this.api.archiveEquipment(equipment.id)),
        switchMap(() => this.fetchEquipments()),
        untilDestroyed(this),
      )
      .subscribe(() => {
        this.notificationService.openSuccess(`${equipment.title} было за архивированно!`);
      });
  }

  private openArchiveConfirmation(name: string) {
    // //todo add new logic
    // return this.dialog
    //   .open(ConfirmationModalComponent, {
    //     ...this.commonModalConfig,
    //     data: {
    //       name,
    //       title: ModalEnum.ArchiveTitle,
    //       reason: ModalEnum.ArchiveReason,
    //       applyButtonText: ModalEnum.ArchiveApplyButtonText,
    //     },
    //   })
    //   .afterClosed()
    //   .pipe(tap());
  }

  private openBlockConfirmation(name: string) {
    // //todo add new logic
    // return this.dialog
    //   .open(ConfirmationModalComponent, {
    //     ...this.commonModalConfig,
    //     data: {
    //       name,
    //       title: ModalEnum.BlockTitle,
    //       reason: ModalEnum.BlockReason,
    //       applyButtonText: ModalEnum.BlockApplyButtonText,
    //     },
    //   })
    //   .afterClosed();
  }

  private openOrderNotificationModal(action: string): Observable<unknown> {
    return this.dialog
      .open(OrderNotificationModalComponent, {
        ...this.commonModalConfig,
        data: action,
      })
      .afterClosed();
  }

  private openArchiveEquipmentModal(equipment: Equipment) {
    return this.dialog
      .open(ArchiveEquipmentModalComponent, {
        ...this.commonModalConfig,
        data: equipment,
      })
      .afterClosed();
  }
  private openBlockEquipmentModal(equipment: Equipment) {
    //todo add new logic
    // return this.dialog
    //   .open(BlockEquipmentModalComponent, {
    //     ...this.commonModalConfig,
    //     data: equipment,
    //   })
    //   .afterClosed();
  }

  createCategoriesDictionary(
    items: { id: number; name: string; translation?: string }[],
    dictionary: Dictionary<string>,
  ) {
    items.forEach((item) => (dictionary[item.id] = item.translation || item.name));
  }

  private getDictionaryValue(dictionary: Dictionary<string>, key: string | number): string | undefined {
    const value = dictionary[key];
    return value ? value : undefined;
  }
}
