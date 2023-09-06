import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '@app/catalog/models';
import { AppRoutes } from '@app/shared/constants/routes.enum';

@Component({
  selector: 'lc-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryItemComponent {
  @Input() item?: Category;
  @Output() categorySelected = new EventEmitter<number>();
  readonly catalogPath = `/${AppRoutes.Catalog}`;

  get categoryId() {
    return this.item?.id || 0;
  }

  selectCategory(categoryId: number) {
    this.categorySelected.next(categoryId);
  }
}
