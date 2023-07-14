import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogController } from '../../services';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { CategoryId } from '@app/catalog/models';
import { Store } from '@ngxs/store';
import { CatalogState } from '@app/catalog/store';

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

  constructor(
    private controller: CatalogController,
    private mainPageHeaderService: MainPageHeaderService,
    private route: ActivatedRoute,
    private store: Store,
  ) {
    mainPageHeaderService.setPageTitle('Каталог');
  }

  ngOnInit() {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((param) => {
      if ((<CategoryId>param)['categoryId']) {
        const selectedCategoryId = Number((<CategoryId>param)['categoryId']);
        this.controller.selectedCategoryId = selectedCategoryId;
        const equipmentFilter = this.store.selectSnapshot(CatalogState.equipmentFilter);
        const searchInput = this.store.selectSnapshot(CatalogState.searchInput);

        this.controller.filterEquipment({
          ...equipmentFilter,
          category: selectedCategoryId,
          name_substring: searchInput,
        });
      } else {
        this.controller.getCatalog();
      }
    });

    this.controller.displayCatalogFilterButton(true);
  }

  onSearch(term: string) {
    this.controller.searchInput = term;
    let equipmentFilter = this.store.selectSnapshot(CatalogState.equipmentFilter);
    equipmentFilter = { ...equipmentFilter, name_substring: term };
    this.controller.filterEquipment(equipmentFilter);
  }

  ngOnDestroy(): void {
    this.controller.displayCatalogFilterButton(false);
  }
}
