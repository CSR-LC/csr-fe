import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CatalogController } from '../../services';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { CategoryId } from '@app/catalog/models';
import { EquipmentFilter } from '@app/shared/types';
import { DataService } from '@app/shared/services/data/data.service';
import { switchMap } from 'rxjs';
import { FilterService } from '@app/shared/services/filter/filter.service';

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
  filterValue!: EquipmentFilter;
  selectedFilters!: number;

  constructor(
    private controller: CatalogController,
    private mainPageHeaderService: MainPageHeaderService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private dataService: DataService,
    private filterService: FilterService,
  ) {
    this.mainPageHeaderService.setPageTitle('Каталог');
  }

  ngOnInit() {
    this.dataService.data$
      .pipe(
        switchMap((data) => {
          this.filterValue = data;
          return this.dataService.count$;
        }),
        switchMap((count) => {
          this.selectedFilters = count;
          return this.route.params;
        }),
        untilDestroyed(this),
      )
      .subscribe((param) => {
        this.dataService.shareRouteParam(param);
        if (this.filterValue?.technicalIssues === false) {
          this.filterValue = { petKinds: this.filterValue.petKinds, petSize: this.filterValue.petSize };
        }
        if ((<CategoryId>param)['categoryId']) {
          if (this.selectedFilters > 0) {
            const filterValue = { category: Number((<CategoryId>param)['categoryId']), ...this.filterValue };
            this.controller.filterEquipment(filterValue);
          } else {
            const filterValue = { category: Number((<CategoryId>param)['categoryId']) };
            this.controller.filterEquipment(filterValue);
          }
        } else {
          if (this.selectedFilters === 0) this.controller.getCatalog();
          else {
            this.controller.filterEquipment(this.filterValue);
          }
        }
        this.cd.markForCheck();
      });

    this.filterService.emit(false);
  }

  onSearch(term: string) {
    this.catalog$ = this.controller.searchEquipment(term);
  }

  ngOnDestroy() {
    this.filterService.emit(true);
  }
}
