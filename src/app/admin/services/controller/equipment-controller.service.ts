import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArchiveEquipmentModalComponent } from '@app/admin/components/archive-equipment-modal/archive-equipment-modal.component';
import { AdminApi } from '@app/admin/services';
import { BehaviorSubject, filter, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { Equipment } from '@app/catalog/models/equipment';
import { BlockEquipmentModalComponent } from '@app/admin/components/block-equipment-modal/block-equipment-modal.component';
import { Dictionary, ItemTranslated } from '@app/shared/types';
import { TableAction } from '@shared/models/table-action';
import { EquipmentAction } from '@shared/constants/equipment-action.enum';
import { NotificationsService } from '@app/shared/services/notifications/notifications.service';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { OrderNotificationModalComponent } from '@app/admin/components/order-notification-modal/order-notification-modal.component';
import { TableRow } from '@app/shared/models/table-row';
import { EquipmentStatusId } from '@app/shared/models/equipment-status-ids';
import { equipmentStatusIdDefaultValue } from '@app/shared/constants/equipment-status-id';
import { EquipmentStatus } from '@app/admin/types/equipment-status';
import { Period } from '@app/shared/models/period';
import { UnavailableDates } from '@app/features/date-range/models';
import { DictionaryService } from '@app/shared/services/dictionary/dictionary.service';
import { EquipmentModalComponent } from '@app/admin/components';
import { EquipmentModalResponse } from '@app/admin/types/equipment-modal-response';
import { Store } from '@ngxs/store';
import { BaseKind } from '@app/shared/models/management';
import { ADMIN_MODAL_CONFIG } from '@app/admin/constants/admin-modal-config';
import { MainPageHeaderService } from '@app/shared/services/main-page-header.service';
import { EquipmentNotification } from '@app/admin/constants/equipment-naotification';
import { INITIAL_EQUIPMENT_ACTIONS_STATE } from '@app/admin/constants/initial-equipment-actions-state';

@UntilDestroy
@Injectable()
export class EquipmentController {
  private equipmentDataSubj$ = new BehaviorSubject<TableRow[]>([]);
  private inventoryNumbers: number[] = [];
  categoryDictionary: Dictionary<string> = {};
  statusDictionary: Dictionary<string> = {};
  statusIdsDictionary: EquipmentStatusId = {
    ...equipmentStatusIdDefaultValue,
  };

  get equipmentData$(): Observable<TableRow[]> {
    return this.equipmentDataSubj$.asObservable();
  }

  constructor(
    private readonly dialog: MatDialog,
    private readonly api: AdminApi,
    private readonly notificationService: NotificationsService,
    private readonly mainHeaderService: MainPageHeaderService,
    private readonly dictionaryService: DictionaryService,
    private readonly store: Store,
  ) {}

  manageEvent(data: TableAction<Equipment>) {
    switch (data.action) {
      case EquipmentAction.Block:
        this.blockEquipment(data);
        break;
      case EquipmentAction.Edit:
        this.manageEquipment(data.row);
        break;
      case EquipmentAction.Archivate:
        this.archivateEquipment(data);
        break;
    }
  }

  fetchEquipments() {
    return this.api.getAllEquipment().pipe(
      tap((res) => (this.inventoryNumbers = res.items.map((i) => i.inventoryNumber))),
      map((res) => this.createRows(res.items)),
      tap((data: TableRow[]) => this.equipmentDataSubj$.next(data)),
    );
  }

  private createRows(equipments: Equipment[]): TableRow[] {
    return equipments.map((equipment) => {
      let actions = INITIAL_EQUIPMENT_ACTIONS_STATE;
      const categoryName = this.dictionaryService.getDictionaryValue(this.categoryDictionary, equipment.category);
      const statusName = this.dictionaryService.getDictionaryValue(this.statusDictionary, equipment.status);
      if (categoryName) equipment.categoryName = categoryName;
      if (statusName) equipment.statusName = statusName;
      if (equipment.status === this.statusIdsDictionary.archived) {
        actions = {
          ...actions,
          [EquipmentAction.Archivate]: {
            tooltip: '',
            disabled: true,
          },
          [EquipmentAction.Edit]: {
            tooltip: '',
            disabled: true,
          },
          [EquipmentAction.Block]: {
            tooltip: '',
            disabled: true,
          },
        };
      }

      return { ...equipment, actions, selected: false };
    });
  }

  private blockEquipment(data: TableAction<Equipment>) {
    const equipment = data.row;
    let unavailableDates: UnavailableDates[];
    let blockPeriod: Period;

    this.api
      .getUnavailablePeriodsById(equipment.id)
      .pipe(
        map((res) => {
          unavailableDates = res.items ? res.items : [];
          return res.items;
        }),
        switchMap((unavailablePeriods) => this.openBlockEquipmentModal(equipment, unavailablePeriods)),
        filter(Boolean),
        map((period) => {
          blockPeriod = period;
          return this.isPeriodsIntersect(period, unavailableDates);
        }),
        switchMap((isIntersect) => (isIntersect ? this.openOrderNotificationModal(data.action) : of(true))),
        filter(Boolean),
        switchMap(() => this.api.blockEquipment(equipment.id, blockPeriod)),
        untilDestroyed(this),
      )
      .subscribe((res) => {
        this.notificationService.openSuccess(`${equipment.title} ${EquipmentNotification.blocked}`);
      });
  }

  private isPeriodsIntersect(blockPeiod: Period, unavailablePeriods: UnavailableDates[]): boolean {
    for (const unavailablePeriod of unavailablePeriods) {
      if (
        this.isDateInPeriod(blockPeiod.startDate, unavailablePeriod) ||
        this.isDateInPeriod(blockPeiod.endDate, unavailablePeriod)
      ) {
        return true;
      }
    }
    return false;
  }

  private isDateInPeriod(date: Date, period: UnavailableDates) {
    const startUnavailable = new Date(period.start_date);
    const endUnavailable = new Date(period.end_date);
    const dateTime = date.getTime();
    return date >= startUnavailable && date <= endUnavailable;
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
        this.notificationService.openSuccess(`${equipment.title} ${EquipmentNotification.archived}}`);
      });
  }

  private openOrderNotificationModal(action: string): Observable<unknown> {
    return this.dialog
      .open(OrderNotificationModalComponent, {
        ...ADMIN_MODAL_CONFIG,
        data: action,
      })
      .afterClosed();
  }

  private openArchiveEquipmentModal(equipment: Equipment) {
    return this.dialog
      .open(ArchiveEquipmentModalComponent, {
        ...ADMIN_MODAL_CONFIG,
        data: equipment,
      })
      .afterClosed();
  }

  private openBlockEquipmentModal(equipment: Equipment, unavailablePeriods: UnavailableDates[]): Observable<Period> {
    return this.dialog
      .open(BlockEquipmentModalComponent, {
        ...ADMIN_MODAL_CONFIG,
        data: {
          equipment,
          unavailablePeriods: unavailablePeriods ? unavailablePeriods : [],
        },
      })
      .afterClosed();
  }

  createCategoryDictionary(items: ItemTranslated[]) {
    this.dictionaryService.createDictionary(items, this.categoryDictionary);
  }

  createStatusDictionary(items: ItemTranslated[]) {
    this.dictionaryService.createDictionary(items, this.statusDictionary);
  }

  createEquipmentStatusIds(statuses: EquipmentStatus[]) {
    statuses.forEach((status) => {
      this.statusIdsDictionary[status.name as keyof EquipmentStatusId] = status.id;
    });
  }

  private manageEquipment(equipment?: Equipment) {
    this.openEquipmentModal(equipment)
      .pipe(
        filter(Boolean),
        switchMap((res) => {
          return forkJoin({
            photo: res.file ? this.api.uploadPhoto(res.file) : of(null),
            equipment: of(res.equipment),
          });
        }),
        switchMap((res) => {
          if (res.photo) res.equipment.photoID = res.photo.data.id;
          return equipment
            ? this.api.editEquipment(res.equipment, equipment.id)
            : this.api.registerEquipment(res.equipment);
        }),
        switchMap(() => this.fetchEquipments()),
        untilDestroyed(this),
      )
      .subscribe((res) => {
        this.notificationService.openSuccess(equipment ? EquipmentNotification.edited : EquipmentNotification.added);
      });
  }

  addNewEquipment() {
    this.manageEquipment();
  }

  private openEquipmentModal(equipment?: Equipment): Observable<EquipmentModalResponse | false> {
    const appData = this.store.snapshot().application_data;
    return this.dialog
      .open(EquipmentModalComponent, {
        autoFocus: false,
        data: {
          inventoryNumbers: this.inventoryNumbers || [],
          equipment: equipment ? this.prepareEquipmentForModal(equipment) : undefined,
          petKinds: appData?.petKinds || [],
          petSizes: appData?.petSizes || [],
          categories: appData?.equipmentCategories || [],
        },
      })
      .afterClosed();
  }

  private prepareEquipmentForModal(equipment: Equipment): Equipment {
    const kinds = this.store.snapshot().application_data.petKinds as BaseKind[];
    const copy = { ...equipment };
    copy.receiptDate = Number(`${copy.receiptDate}000`);

    // TODO: remove this the back will send petkinds ids
    copy.petKinds = equipment.petKinds.map((kind) => {
      if (typeof kind === 'number') return kind;
      const kindStored = kinds.find((el) => el.name === kind.name);
      return kindStored ? kindStored.id : 0;
      // TODO: remove casting vhen the back will send petkinds ids
    }) as unknown as { name: string }[];

    return copy;
  }

  setPageHeader() {
    this.mainHeaderService.setPageTitle('Оборудование');
  }
}
