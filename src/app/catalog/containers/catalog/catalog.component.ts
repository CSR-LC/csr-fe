import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogController } from '../../services';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { filter } from 'rxjs';

@UntilDestroy
@Component({
  selector: 'lc-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit, OnDestroy {
  catalog$ = this.controller.catalog$;
  noResultMessage: string = 'Извините, по вашему запросу ничего не найдено. Попробуйте изменить критерии запроса.';

  constructor(private controller: CatalogController, private mainPageHeaderService: MainPageHeaderService) {
    mainPageHeaderService.setPageTitle('Каталог');
  }

  ngOnInit() {
    this.controller.filterEquipment();

    this.controller.displayCatalogFilterButton(true);

    this.controller
      .isFilteringApplied()
      .pipe(
        filter((isApplied) => isApplied),
        untilDestroyed(this),
      )
      .subscribe(() => {
        this.controller.filterEquipment();
      });
  }

  onSearch(term: string) {
    this.controller.searchInput = term;
    this.controller.filterEquipment();
  }

  ngOnDestroy(): void {
    this.controller.displayCatalogFilterButton(false);
  }
}
