import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AdminController } from '@app/admin/services';
import { Observable } from 'rxjs/internal/Observable';
import { TableAction } from '@shared/models/table-action';
import { Equipment } from '@app/catalog/models/equipment';
import { TableColumn } from '@shared/models/table-column';

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
  }

  editEquipment(data: TableAction<Equipment>) {
    this.controller.editEquipment(data);
  }
}
