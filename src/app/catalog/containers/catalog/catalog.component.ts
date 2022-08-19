import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CatalogController } from '../../services';
import {MainPageHeaderService} from "../../../shared/services/main-page-header.service";

@Component({
  selector: 'lc-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})
export class CatalogComponent implements OnInit {
  public catalog$ = this.controller.catalog$;

  constructor(private controller: CatalogController, private mainPageHeaderService: MainPageHeaderService) {
    mainPageHeaderService.setPageTitle('Каталог');
  }

  ngOnInit(): void {
    this.controller.getCatalog();
  }

  public onSearch(term: string) {
    this.catalog$ = this.controller.searchEquipment(term);
  }
}
