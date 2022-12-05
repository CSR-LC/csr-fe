import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent, EquipmentItemComponent } from '@app/catalog/containers';
import { CategoriesComponent } from './containers/categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
  },
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: ':id',
    component: EquipmentItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
