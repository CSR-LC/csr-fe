import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CatalogFilterService } from '@app/catalog/services/catalog/catalog-filter.service';
import { EquipmentFilter, EquipmentFilterForm } from '@app/catalog/models';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';
import { filter, Observable } from 'rxjs';
import { areObjectsEqual } from '@shared/utils/utils';
import { FilterModalResult } from '@app/catalog/models/filter-modal-result';

@UntilDestroy
@Component({
  selector: 'lc-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogFilterComponent implements OnInit {
  private catalogFilterService = inject(CatalogFilterService);

  public equipmentFilterCount$!: Observable<number>;

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
      .subscribe((filterModalResult: FilterModalResult) => {
        !filterModalResult.isFormState
          ? !areObjectsEqual(this.catalogFilterService.equipmentFilter, filterModalResult.equipmentFilter) &&
            (this.catalogFilterService.equipmentFilter = filterModalResult.equipmentFilter as EquipmentFilter)
          : (this.catalogFilterService.equipmentFilterForm = filterModalResult.equipmentFilter as EquipmentFilterForm);
      });
  }
}
