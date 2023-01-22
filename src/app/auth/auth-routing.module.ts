import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '@app/auth/containers/auth/auth.component';
import { PublicOfferComponent } from '@app/auth/components/public-offer/public-offer.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AuthComponent,
  },
  {
    path: 'public-offer',
    component: PublicOfferComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
