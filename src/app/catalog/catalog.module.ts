import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogApi } from './services';
import { SharedModule } from '@shared/shared.module';
import { CatalogComponent, EquipmentItemComponent } from './containers';
import { PreviewEquipmentCardComponent, CatalogSearchComponent } from './components';
import { NgxsModule } from '@ngxs/store';
import { CatalogState } from './store';
import { MaterialModule } from '../material/material.module';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { CategoriesComponent } from './containers/categories/categories.component';
import { CategorySetComponent } from './containers/category-set/category-set.component';
import { CategoryTabComponent } from './components/category-tab/category-tab.component';
import { RouterLinkPathPipe } from './pipes/router-link-path/router-link-path.pipe';

@NgModule({
  declarations: [
    CatalogComponent,
    PreviewEquipmentCardComponent,
    CatalogSearchComponent,
    EquipmentItemComponent,
    CategoriesComponent,
    CategoryItemComponent,
    CategorySetComponent,
    CategoryTabComponent,
    RouterLinkPathPipe,
  ],
  imports: [CommonModule, CatalogRoutingModule, SharedModule, MaterialModule, NgxsModule.forFeature([CatalogState])],
  providers: [CatalogApi],
})
export class CatalogModule {}
