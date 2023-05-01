import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { TokensGuard } from '@shared/guards/tokens.guard';
import { PetKindsResolver } from '@shared/resolvers/pet-kinds.resolver';
import { PetSizeResolver } from '@shared/resolvers/pet-size.resolver';
import { PublicOfferComponent } from '@app/shared/components/public-offer/public-offer.component';
import { EmailConfirmationComponent } from './auth/components/email-confirmation/email-confirmation.component';

const routes: Routes = [
  {
    path: 'auth',
    pathMatch: 'full',
    canActivate: [TokensGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: {
      petKinds: PetKindsResolver,
      petSizes: PetSizeResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'catalog/categories',
      },
      {
        path: 'catalog',
        loadChildren: () => import('./catalog/catalog.module').then((m) => m.CatalogModule),
      },
      {
        path: 'management',
        loadChildren: () => import('./management/management.module').then((m) => m.ManagementModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./user-profile/user-profile.module').then((m) => m.UserProfile),
      },
    ],
  },
  {
    path: 'public-offer',
    component: PublicOfferComponent,
  },
  {
    path: 'email-confirmation',
    component: EmailConfirmationComponent,
  },
  { path: 'email-confirmation/:token', component: EmailConfirmationComponent },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
