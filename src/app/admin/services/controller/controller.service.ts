import { Injectable } from '@angular/core';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ArchiveEquipmentModalComponent } from '@app/admin/components/archive-equipment-modal/archive-equipment-modal.component';
import { ModalEnum } from '@app/admin/constants/modal.enum';
import { AdminApi } from '@app/admin/services';
import { BehaviorSubject, Observable, catchError, filter, map, of, pipe, switchMap, tap } from 'rxjs';
import { Equipment, EquipmentAvailability } from '@app/catalog/models/equipment';
import { BlockEquipmentModalComponent } from '@app/admin/components/block-equipment-modal/block-equipment-modal.component';
import { BaseItemsResponse } from '@app/shared/types';
import { EquipmentColumns } from '@app/admin/constants/equipment-columns';
import { TableAction } from '@shared/models/table-action';
import { ActionEnum } from '@shared/constants/action.enum';
import { NotificationsService } from '@app/shared/services/notifications/notifications.service';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { TableColumn } from '@shared/models/table-column';

@UntilDestroy
@Injectable()
export class ControllerService {
  readonly equipmentColumns: TableColumn[] = EquipmentColumns;
  private equipmentDataSubj$ = new BehaviorSubject<Equipment[]>([]);
  private equipmentTotalSubj$ = new BehaviorSubject<number>(0);
  private equipmentPageSubj$ = new BehaviorSubject<number>(0);

  get equipmentData$(): Observable<Equipment[]> {
    return this.equipmentDataSubj$.asObservable();
  }

  get equipmentTotal$(): Observable<number> {
    return this.equipmentTotalSubj$.asObservable();
  }

  get equipmentPage$(): Observable<number> {
    return this.equipmentPageSubj$.asObservable();
  }

  constructor(private dialog: MatDialog, private api: AdminApi, private notificationService: NotificationsService) {
    this.fetchEquipments().subscribe();
  }

  editEquipment(data: TableAction<Equipment>) {
    switch (data.action) {
      case ActionEnum.Block:
        // eslint-disable-next-line no-console
        console.log(data.action);
        //this.blockEquipment(data.row);
        break;
      case ActionEnum.Edit:
        // eslint-disable-next-line no-console
        console.log(data.action);
        //this.editEquipment(data.row);
        break;
      case ActionEnum.Archivate:
        // eslint-disable-next-line no-console
        console.log(data.action);
        //this.archivateEquipment(data.row);
        break;
    }
  }

  setPage(page: number) {
    this.fetchEquipments(page)
      .pipe(tap(() => this.equipmentPageSubj$.next(page)))
      .subscribe();
  }

  fetchEquipments(page: number = 0) {
    return this.api.getAllEquipment(page).pipe(
      tap((data: BaseItemsResponse<Equipment>) => {
        if (!this.equipmentTotalSubj$.getValue()) {
          this.equipmentTotalSubj$.next(data.total);
        }
      }),
      tap((data: BaseItemsResponse<Equipment>) => this.equipmentDataSubj$.next(data.items)),
    );
  }

  private blockEquipment(equipment: Equipment) {
    //todo add new logic
    let blockPeriod: EquipmentAvailability;
    this.openBlockEquipmentModal(equipment)
      .pipe(
        filter(Boolean),
        switchMap((period: EquipmentAvailability) => {
          blockPeriod = period;
          return this.api.getEquipmentAvailable(period);
        }),
        switchMap((name: string) => (name ? this.openBlockConfirmation(name) : of(true))),
        filter(Boolean),
        switchMap(() => this.api.blockEquipment(equipment.id, blockPeriod)),
        tap(() => this.notificationService.openSuccess(`${equipment.title} было за блокированно!`)),
        untilDestroyed(this),
        catchError((error) => {
          this.notificationService.openError(error);
          throw new Error(error);
        }),
      )
      .subscribe();
  }

  private archivateEquipment(equipment: Equipment) {
    //todo add new logic
    let blockPeriod: EquipmentAvailability;
    this.openArchiveEquipmentModal(equipment)
      .pipe(
        filter(Boolean),
        switchMap((period: EquipmentAvailability) => {
          blockPeriod = period;
          return this.api.getEquipmentAvailable(period);
        }),
        switchMap((name: string) => (name ? this.openArchiveConfirmation(name) : of(true))),
        filter(Boolean),
        switchMap(() => this.api.blockEquipment(equipment.id, blockPeriod)),
        tap(() => this.notificationService.openSuccess(`${equipment.title} было за архивированно!`)),
        untilDestroyed(this),
        catchError((error) => {
          this.notificationService.openError(error);
          throw new Error(error);
        }),
      )
      .subscribe();
  }

  private openArchiveConfirmation(name: string) {
    return this.dialog
      .open(ConfirmationModalComponent, {
        maxWidth: 472,
        minWidth: 472,
        autoFocus: false,
        data: {
          name,
          title: ModalEnum.ArchiveTitle,
          reason: ModalEnum.ArchiveReason,
          applyButtonText: ModalEnum.ArchiveApplyButtonText,
        },
      })
      .afterClosed()
      .pipe(tap());
  }

  private openBlockConfirmation(name: string) {
    return this.dialog
      .open(ConfirmationModalComponent, {
        maxWidth: 472,
        minWidth: 472,
        autoFocus: false,
        data: {
          name,
          title: ModalEnum.BlockTitle,
          reason: ModalEnum.BlockReason,
          applyButtonText: ModalEnum.BlockApplyButtonText,
        },
      })
      .afterClosed();
  }

  private openArchiveEquipmentModal(equipment: Equipment) {
    return this.dialog
      .open(ArchiveEquipmentModalComponent, {
        maxWidth: 472,
        minWidth: 472,
        autoFocus: false,
        data: equipment,
      })
      .afterClosed();
  }
  private openBlockEquipmentModal(equipment: Equipment) {
    return this.dialog
      .open(BlockEquipmentModalComponent, {
        maxWidth: 472,
        minWidth: 472,
        autoFocus: false,
        data: equipment,
      })
      .afterClosed();
  }
}
