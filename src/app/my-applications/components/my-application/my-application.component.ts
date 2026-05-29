import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Application } from '@app/admin/types';
import { AppRoutes } from '@shared/constants/routes.enum';
import { DateService } from '@shared/services/date/date.service';
import { ApplicationStatusNamesTranslation } from '@app/admin/constants/applications-status-names-translation';

@Component({
  selector: 'lc-my-application',
  templateUrl: './my-application.component.html',
  styleUrls: ['./my-application.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyApplicationComponent {
  private readonly dateService = inject(DateService);
  readonly route = `/${AppRoutes.MyApplications}`;
  @Input() application!: Application;

  toDate(ns: number | string): Date {
    return this.dateService.fromNanoseconds(ns);
  }

  getStatus(status: string): string {
    return ApplicationStatusNamesTranslation[status as keyof typeof ApplicationStatusNamesTranslation] || status;
  }
}
