import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogController } from '../../services';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { CategoryId } from '@app/catalog/models';

@UntilDestroy
@Component({
  selector: 'lc-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})
export class CatalogComponent implements OnInit, OnDestroy {
  catalog$ = this.controller.catalog$;

  constructor(
    private controller: CatalogController,
    private mainPageHeaderService: MainPageHeaderService,
    private route: ActivatedRoute,
  ) {
    mainPageHeaderService.setPageTitle('Каталог');
  }

  ngOnInit() {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((param) => {
      if ((<CategoryId>param)['categoryId']) {
        this.controller.filterEquipmentByCategory(Number((<CategoryId>param)['categoryId']));
      } else {
        this.controller.getCatalog();
      }
    });

    this.controller.displayCatalogFilterButton(true);
  }

  onSearch(term: string) {
    this.catalog$ = this.controller.searchEquipment(term);
  }

  ngOnDestroy(): void {
    this.controller.displayCatalogFilterButton(false);
  }
}
