import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '@app/auth/containers/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
