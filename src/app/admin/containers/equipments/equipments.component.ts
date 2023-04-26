import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { User } from '@app/auth/models';
import { ActivatedRoute } from '@angular/router';
import { AdminController } from '@app/admin/services';
import { Observable } from 'rxjs/internal/Observable';
import { ActionEmit, TableColumn, TableData } from '@app/shared/models/table';
import { Equipment } from '@app/catalog/models/equipment';

@Component({
  selector: 'lc-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdminController],
})
export class EquipmentsComponent implements OnInit {
  user: User | null = null;

  columns: TableColumn[] = this.controller.equipmentColumns;

  data$: Observable<Equipment[]> = this.controller.equipmentData$;

  total$: Observable<number> = this.controller.equipmentTotal$;

  page$: Observable<number> = this.controller.equipmentPage$;

  constructor(private route: ActivatedRoute, private controller: AdminController) {}

  ngOnInit() {
    // the information should be get from store now.
    this.user = this.route.snapshot.data['user'];
  }

  editCell(data: ActionEmit<Equipment>) {
    this.controller.editCell(data);
  }

  setPage(page: number) {
    this.controller.setPage(page);
  }
}
