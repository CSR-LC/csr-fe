import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApplicationColumns } from '@app/admin/constants/application-columns';
import { ApplicationsControllerService } from '@app/admin/services/applications-controller/applications-controller.service';
import { TableRow } from '@app/shared/models/table-row';
import { Observable } from 'rxjs';

@Component({
  selector: 'lc-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  providers: [ApplicationsControllerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit {
  readonly columns = ApplicationColumns;
  get applications$(): Observable<TableRow[]> {
    return this.controller.applicationsData$;
  }

  constructor(private readonly controller: ApplicationsControllerService) {}

  ngOnInit() {
    this.controller.fetchEquipments().subscribe();
  }
}
