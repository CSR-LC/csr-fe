import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '@app/catalog/models';
import { CatalogController } from '@app/catalog/services';
import { CategoriesState } from '@app/catalog/store';
import { MainPageHeaderService } from '@app/shared/services/main-page-header.service';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'lc-category-equipment',
  templateUrl: './category-equipment.component.html',
  styleUrls: ['./category-equipment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})
export class CategoryEquipmentComponent implements OnInit {
  @Select(CategoriesState.categories) categories$!: Observable<Category[]>;
  categoryId: number = Number(this.route.snapshot.params['categoryId']);

  constructor(
    private mainPageHeaderService: MainPageHeaderService,
    private route: ActivatedRoute,
    private controller: CatalogController,
  ) {
    this.controller
      .getCategoryById(`${this.categoryId}`)
      .subscribe((item) => this.mainPageHeaderService.setPageTitle(item.data.name));
  }

  ngOnInit() {
    this.controller.getCategories();
  }

  updateParamsCategory(categoryId: number, categoryName: string) {
    this.categoryId = categoryId;
    this.mainPageHeaderService.setPageTitle(categoryName);
  }
}
