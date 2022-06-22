import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FillProfileComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: FillProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
