import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CatalogFilterService } from '@app/catalog/services/catalog/catalog-filter.service';
import { EquipmentFilter } from '@app/catalog/models';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';
import { filter } from 'rxjs';

@UntilDestroy
@Component({
  selector: 'lc-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogFilterComponent {
  constructor(private catalogFilterService: CatalogFilterService) {}

  openFilters(): void {
    this.catalogFilterService
      .openFiltersModal()
      .pipe(
        filter((data) => !!data),
        untilDestroyed(this),
      )
      .subscribe((equipmentFilter: EquipmentFilter) => {
        this.catalogFilterService.equipmentFilter = equipmentFilter;
        this.catalogFilterService.setFilteringApplied(true);
      });
  }
}
