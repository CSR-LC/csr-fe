import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Application } from '@app/admin/types';
import { AppRoutes } from '@shared/constants/routes.enum';
import { Select } from '@ngxs/store';
import { ApplicationDataState } from '@shared/store/application-data';
import { Observable } from 'rxjs/internal/Observable';
import { PetSize } from '@shared/models';
import { ItemTranslated } from '@shared/types';
import { combineLatest, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  @Select(ApplicationDataState.petSizes) petSizes$!: Observable<PetSize[]>;
  @Select(ApplicationDataState.applicationStatuses) applicationStatuses$!: Observable<ItemTranslated[]>;
  petSizesAndApplicationStatuses$ = combineLatest([this.petSizes$, this.applicationStatuses$]).pipe(
    map(
      ([petSizes, applicationStatuses]): {
        petSizes: PetSize[];
        applicationStatuses: ItemTranslated[];
      } => ({ petSizes, applicationStatuses }),
    ),
    takeUntilDestroyed(),
  );

  getPetSize(petSizes: PetSize[], petSizeId: number): string {
    return petSizes.find((petSize) => petSize.id === petSizeId)?.size || '';
  }

  getStatus(statuses: ItemTranslated[], statusName: ApplicationStatusName): string {
    return statuses.find((status) => status.name === statusName)?.translation || '';
  }
}
