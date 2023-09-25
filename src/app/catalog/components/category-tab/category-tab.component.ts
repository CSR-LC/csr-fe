import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '@app/catalog/models';

@Component({
  selector: 'lc-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryTabComponent {
  @Input() item?: Category;
  @Output() categorySelected = new EventEmitter<number>();

  get categoryId() {
    return this.item?.id || 0;
  }

  selectCategory(categoryId: number): void {
    this.categorySelected.next(categoryId);
  }
}
