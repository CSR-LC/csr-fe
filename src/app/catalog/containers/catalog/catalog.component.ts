import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CatalogController } from '../../services';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lc-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})
export class CatalogComponent implements OnInit {
  catalog$ = this.controller.catalog$;

  constructor(
    private controller: CatalogController,
    private mainPageHeaderService: MainPageHeaderService,
    private route: ActivatedRoute,
  ) {
    mainPageHeaderService.setPageTitle('Каталог');
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      param['categoryId']
        ? this.controller.filterEquipmentByCategory(Number(param['categoryId']))
        : this.controller.getCatalog();
    });
  }

  onSearch(term: string) {
    this.catalog$ = this.controller.searchEquipment(term);
  }
}
