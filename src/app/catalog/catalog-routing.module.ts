import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent, EquipmentItemComponent } from '@app/catalog/containers';
import { PetKindsResolver } from '@app/shared/resolver/pet-kinds.resolver';
import { CategoriesComponent } from './containers/categories/categories.component';
import { CategoriesResolver } from './resolver/categories.resolver';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    resolve: {
      activeCategories: CategoriesResolver,
      petKinds: PetKindsResolver,
    },
  },
  {
    path: 'categories',
    resolve: {
      activeCategories: CategoriesResolver,
      petKinds: PetKindsResolver,
    },
    children: [
      {
        path: '',
        component: CategoriesComponent,
      },
      {
        path: ':categoryId',
        component: CatalogComponent,
      },
    ],
  },
  {
    path: 'equipment/:id',
    component: EquipmentItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CategoriesResolver, PetKindsResolver],
})
export class CatalogRoutingModule {}
