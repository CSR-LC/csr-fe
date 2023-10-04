import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AdminController } from '@app/admin/services';
import { Observable } from 'rxjs/internal/Observable';
import { TableAction } from '@shared/models/table-action';
import { Equipment } from '@app/catalog/models/equipment';
import { TableColumn } from '@shared/models/table-column';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';

@UntilDestroy
@Component({
  selector: 'lc-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdminController],
})
export class EquipmentsComponent implements OnInit {
  columns: TableColumn[] = this.controller.equipmentColumns;
  data$: Observable<Equipment[]> = this.controller.equipmentData$;

  constructor(private controller: AdminController) {}

  ngOnInit() {
    this.controller.fetchEquipments().subscribe();
    this.controller.equipmentCategories
      .pipe(untilDestroyed(this))
      .subscribe((res) => this.controller.createCategoriesDictionary(res, this.controller.categoryDictionary));
    this.controller.equipmentStatuses
      .pipe(untilDestroyed(this))
      .subscribe((res) => this.controller.createCategoriesDictionary(res, this.controller.statusDictionary));
  }

  editEquipment(data: TableAction<Equipment>) {
    this.controller.editEquipment(data);
  }
}
