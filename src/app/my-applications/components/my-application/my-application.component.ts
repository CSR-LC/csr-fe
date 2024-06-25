import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Application } from '@app/admin/types';
import { AppRoutes } from '@shared/constants/routes.enum';
import { Select } from '@ngxs/store';
import { ApplicationDataState } from '@shared/store/application-data';
import { Observable } from 'rxjs/internal/Observable';
import { ItemTranslated } from '@shared/types';
import { ApplicationStatusName } from '@app/admin/constants/applications-status-names';

@Component({
  selector: 'lc-my-application',
  templateUrl: './my-application.component.html',
  styleUrls: ['./my-application.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyApplicationComponent {
  readonly route = `/${AppRoutes.MyApplications}`;
  @Input() application!: Application;
  @Select(ApplicationDataState.applicationStatuses) applicationStatuses$!: Observable<ItemTranslated[]>;

  getStatus(statuses: ItemTranslated[], statusName: ApplicationStatusName): string {
    return statuses.find((status) => status.name === statusName)?.translation || '';
  }
}
