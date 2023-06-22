import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent, EquipmentItemComponent } from '@app/catalog/containers';
import { CategoriesComponent } from './containers/categories/categories.component';
import { CategoriesResolver } from './resolver/categories.resolver';
import { AppRoutes } from '@app/shared/constants/routes.enum';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    resolve: {
      activeCategories: CategoriesResolver,
    },
  },
  {
    path: AppRoutes.Categories,
    resolve: {
      activeCategories: CategoriesResolver,
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
    path: `${AppRoutes.EquipMent}/:id`,
    component: EquipmentItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CategoriesResolver],
})
export class CatalogRoutingModule {}
