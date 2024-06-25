import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MyApplicationsController } from '@app/my-applications/services';
import { Application } from '@app/admin/types';

@Component({
  selector: 'lc-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyApplicationsComponent implements OnInit {
  applications$ = this.controller.getApplications();
  filter$ = this.controller.getFilter();

  constructor(private readonly controller: MyApplicationsController) {}

  ngOnInit(): void {
    this.controller.setPageTitle();
  }

  applyFilter(value: string | number) {
    this.applications$ = this.controller.getApplications(value as string);
  }

  trackMyApplication(index: number, application: Application) {
    return application.id;
  }
}
