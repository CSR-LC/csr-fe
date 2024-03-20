import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApplicationColumns } from '@app/admin/constants/application-columns';
import { ApplicationsControllerService } from '@app/admin/services/applications-controller/applications-controller.service';
import { Application } from '@app/admin/types/application';
import { TableAction } from '@app/shared/models/table-action';
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
  get applications$(): Observable<TableRow<Application>[]> {
    return this.controller.applicationsData$;
  }

  constructor(private readonly controller: ApplicationsControllerService) {}

  ngOnInit() {
    this.controller.fetchApplications().subscribe();
    this.controller.setPageTitle();
  }

  editApplication(event: TableAction<Application>) {
    this.controller.editApplication(event);
  }
}
