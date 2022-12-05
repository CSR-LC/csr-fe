import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CatalogController } from '@app/catalog/services';
import { MainPageHeaderService } from '@app/shared/services/main-page-header.service';

@Component({
  selector: 'lc-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})
export class CategoriesComponent implements OnInit {
  public categories$ = this.controller.categories$;

  constructor(private controller: CatalogController, private mainPageHeaderService: MainPageHeaderService) {
    mainPageHeaderService.setPageTitle('Категории оборудования');
  }

  ngOnInit(): void {
    this.controller.getCategories();
  }
}
