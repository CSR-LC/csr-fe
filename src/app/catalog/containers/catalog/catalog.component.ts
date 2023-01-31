import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CatalogController } from '../../services';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { CategoryId, EquipmentFilter } from '@app/catalog/models';

@UntilDestroy
@Component({
  selector: 'lc-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})
export class CatalogComponent implements OnInit {
  catalog$ = this.controller.catalog$;
  filterValue?: EquipmentFilter;
  selectedFilters: number = 0;

  constructor(
    private controller: CatalogController,
    private mainPageHeaderService: MainPageHeaderService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {
    mainPageHeaderService.setPageTitle('Каталог');
  }

  ngOnInit() {
    this.route.params.pipe(untilDestroyed(this)).subscribe((param) => {
      if ((<CategoryId>param)['categoryId']) {
        if (this.selectedFilters > 0) {
          const filterValue = { category: Number((<CategoryId>param)['categoryId']), ...this.filterValue };
          this.controller.filterEquipment(filterValue);
        } else {
          const filterValue = { category: Number((<CategoryId>param)['categoryId']) };
          this.controller.filterEquipment(filterValue);
        }
      } else {
        this.controller.getCatalog();
      }
    });
  }

  onSearch(term: string) {
    this.catalog$ = this.controller.searchEquipment(term);
  }

  receiveFilterValue(filterValue: EquipmentFilter) {
    this.filterValue = filterValue;
    const currentUrl = this.router.url;
    this.router.navigate(['/catalog/categories/fake']).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  receiveSelectedFilters(selectedFilters: number) {
    this.selectedFilters = selectedFilters;
  }
}
