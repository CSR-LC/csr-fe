import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
  },
  // {
  //   path: ':id',
  //   //todo: replace with DetailedView
  //   component: CatalogComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
