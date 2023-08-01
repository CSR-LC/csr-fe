import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '@app/catalog/models';
import { MainPageHeaderService } from '@app/shared/services/main-page-header.service';
import { CatalogController } from '@app/catalog/services';

@Component({
  selector: 'lc-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private mainPageHeaderService: MainPageHeaderService,
    private route: ActivatedRoute,
    private controller: CatalogController,
  ) {
    mainPageHeaderService.setPageTitle('Категории оборудования');
  }

  ngOnInit() {
    this.categories = this.route.snapshot.data['activeCategories'];
  }

  selectCategory(categoryId: number): void {
    this.controller.selectedCategoryId = categoryId;
  }
}
