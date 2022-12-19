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
import { FilterComponent } from './components/filter/filter.component';
import { FilterModuleComponent } from './components/filter-module/filter-module.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CatalogComponent,
    PreviewEquipmentCardComponent,
    CatalogSearchComponent,
    EquipmentItemComponent,
    FilterComponent,
    FilterModuleComponent,
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    SharedModule,
    MaterialModule,
    NgxsModule.forFeature([CatalogState]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CatalogApi],
})
export class CatalogModule {}
