import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { EquipmentController } from '@app/admin/services';
import { Observable } from 'rxjs/internal/Observable';
import { TableAction } from '@shared/models/table-action';
import { Equipment } from '@app/catalog/models/equipment';
import { TableColumn } from '@shared/models/table-column';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { Select } from '@ngxs/store';
import { ApplicationDataState } from '@app/shared/store/application-data';
import { Category } from '@app/catalog/models';
import { EquipmentStatus } from '@app/admin/types/equipment-status';
import { EquipmentColumns } from '@app/admin/constants/equipment-columns';
import { TableRow } from '@app/shared/models/table-row';

@UntilDestroy
@Component({
  selector: 'lc-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EquipmentController],
})
export class EquipmentsComponent implements OnInit {
  columns: TableColumn[] = EquipmentColumns;
  equipments$: Observable<TableRow<Equipment>[]> = this.controller.equipmentData$;

  @Select(ApplicationDataState.equipmentCategories) equipmentCategories!: Observable<Category[]>;
  @Select(ApplicationDataState.equipmentStatuses) equipmentStatuses!: Observable<EquipmentStatus[]>;

  constructor(private readonly controller: EquipmentController) {}

  ngOnInit() {
    this.controller.setPageHeader();
    this.controller.fetchEquipments().subscribe();
    this.equipmentCategories
      .pipe(untilDestroyed(this))
      .subscribe((res) => this.controller.createCategoryDictionary(res));
    this.equipmentStatuses.pipe(untilDestroyed(this)).subscribe((res) => {
      this.controller.createStatusDictionary(res);
      this.controller.createEquipmentStatusIds(res);
    });
  }

  editEquipment(data: TableAction<Equipment>) {
    this.controller.manageEvent(data);
  }

  addNewEquipment() {
    this.controller.addNewEquipment();
  }
}
