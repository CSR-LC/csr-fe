import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
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
  readonly catalogPath = `${AppRoutes.Catalog}/${AppRoutes.Categories}/`;
}
