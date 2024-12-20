import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '@app/catalog/models';
import { CatalogController } from '@app/catalog/services';

@Component({
  selector: 'lc-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})
export class CategoriesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private controller = inject(CatalogController);

  categories: Category[] = [];

  ngOnInit() {
    this.controller.setPageTitle('Категории оборудования');
    this.categories = this.route.snapshot.data['activeCategories'];
  }

  selectCategory(categoryId: number): void {
    this.controller.selectedCategoryId = categoryId;
  }
}
