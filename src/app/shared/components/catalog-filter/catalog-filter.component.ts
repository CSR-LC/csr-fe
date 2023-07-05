import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { CatalogFilterService } from '@app/catalog/services/catalog/catalog-filter.service';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';

@UntilDestroy
@Component({
  selector: 'lc-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogFilterComponent implements OnInit {
  @HostListener('click') onClick(): void {
    this.catalogFilterService.setFiltersButtonToggled(true);
  }

  constructor(private catalogFilterService: CatalogFilterService) {}

  ngOnInit(): void {
    this.catalogFilterService
      .getFiltersButtonToggled()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.catalogFilterService.openFiltersModal();
      });
  }
}
