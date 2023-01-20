import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Category } from '@app/catalog/models';

@Component({
  selector: 'lc-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryTabComponent {
  @Input() item?: Category;
}
