import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Category } from '@app/catalog/models';

@Component({
  selector: 'lc-category-equipment-item',
  templateUrl: './category-equipment-item.component.html',
  styleUrls: ['./category-equipment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryEquipmentItemComponent {
  @Input() item?: Category;
}
