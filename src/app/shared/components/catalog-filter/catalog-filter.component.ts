import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CatalogFilterService } from '@app/catalog/services/catalog/catalog-filter.service';
import { EquipmentFilter } from '@app/catalog/models';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';
import { filter, Observable } from 'rxjs';
import { areObjectsEqual } from '@shared/utils/utils';

@UntilDestroy
@Component({
  selector: 'lc-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogFilterComponent implements OnInit {
  public equipmentFilterCount$!: Observable<number>;

  constructor(private catalogFilterService: CatalogFilterService) {}

  ngOnInit(): void {
    this.equipmentFilterCount$ = this.catalogFilterService.equipmentFilterCount$;
  }

  openFilters(): void {
    this.catalogFilterService
      .openFiltersModal()
      .pipe(
        filter((data) => !!data),
        untilDestroyed(this),
      )
      .subscribe((equipmentFilter: EquipmentFilter) => {
        !areObjectsEqual(this.catalogFilterService.equipmentFilter, equipmentFilter) &&
          (this.catalogFilterService.equipmentFilter = equipmentFilter);
      });
  }
}
