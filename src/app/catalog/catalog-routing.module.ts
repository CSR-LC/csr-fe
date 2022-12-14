import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './containers';
import { EquipmentItemComponent } from '@app/catalog/containers';

const routes: Routes = [
  {
    path: '',
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
