import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CatalogFilterService } from '@app/catalog/services/catalog/catalog-filter.service';

@Component({
  selector: 'lc-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogFilterComponent {
  constructor(private catalogFilterService: CatalogFilterService) {}

  openFilters(): void {
    this.catalogFilterService.openFiltersModal();
  }
}
