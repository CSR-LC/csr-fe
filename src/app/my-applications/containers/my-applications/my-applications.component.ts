import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MyApplicationsController } from '@app/my-applications/services';
import { Application } from '@app/admin/types';

@Component({
  selector: 'lc-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyApplicationsComponent implements OnInit, OnDestroy {
  applications$ = this.controller.applications$;
  loading$ = this.controller.loading$;
  hasMore$ = this.controller.hasMore$;
  filter$ = this.controller.getFilter();
  currentFilter = '';

  constructor(private readonly controller: MyApplicationsController) {}

  ngOnInit(): void {
    this.controller.loadMoreApplications();
    this.controller.setPageTitle();
  }

  applyFilter(value: string | number) {
    this.currentFilter = value as string;
    this.controller.resetApplications();
    this.controller.loadMoreApplications(this.currentFilter);
  }

  trackMyApplication(index: number, application: Application) {
    return application.id;
  }

  loadMore() {
    this.controller.loadMoreApplications(this.currentFilter);
  }

  ngOnDestroy(): void {
    this.controller.resetApplications();
  }
}
