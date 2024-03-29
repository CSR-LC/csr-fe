import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { SharedModule } from '@shared/shared.module';
import { CatalogComponent, EquipmentItemComponent } from './containers';
import { PreviewEquipmentCardComponent } from './components';
import { NgxsModule } from '@ngxs/store';
import { CatalogState } from './store';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { CategoriesComponent } from './containers/categories/categories.component';
import { CategorySetComponent } from './containers/category-set/category-set.component';
import { CategoryTabComponent } from './components/category-tab/category-tab.component';
import { DateRangeModule } from '@app/features/date-range/date-range-module.module';
import { FilterModalComponent } from '@app/catalog/components/filter-modal/filter-modal.component';

@NgModule({
  declarations: [
    CatalogComponent,
    PreviewEquipmentCardComponent,
    EquipmentItemComponent,
    CategoriesComponent,
    CategoryItemComponent,
    CategorySetComponent,
    CategoryTabComponent,
    FilterModalComponent,
  ],
  imports: [CommonModule, CatalogRoutingModule, SharedModule, DateRangeModule, NgxsModule.forFeature([CatalogState])],
})
export class CatalogModule {}
