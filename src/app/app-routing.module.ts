import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { TokensGuard } from '@shared/guards/tokens.guard';
import { PetKindsResolver } from '@shared/resolvers/pet-kinds.resolver';
import { PetSizeResolver } from '@shared/resolvers/pet-size.resolver';
import { PublicOfferComponent } from '@app/shared/components/public-offer/public-offer.component';
import { PageForbiddenComponent } from '@shared/components';
import { AppRoutes } from '@shared/constants/routes.enum';
import { AdminGuard } from '@shared/guards/admin.guard';
import { EmailConfirmationComponent } from './stand-alone/email-confirmation/component/email-confirmation.component';
import { EmailGuard } from '@shared/guards/email.guard';
import { ConfirmedEmail } from '@shared/guards/confirmed-email.guard';

const routes: Routes = [
  {
    path: AppRoutes.Auth,
    pathMatch: 'full',
    canActivate: [TokensGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      // keep email confiramtion routes before redirect
      {
        path: `${AppRoutes.EmailConfirmation}`,
        component: EmailConfirmationComponent,
        pathMatch: 'full',
        canActivate: [ConfirmedEmail],
      },
      {
        path: `${AppRoutes.EmailConfirmation}/:token`,
        component: EmailConfirmationComponent,
        canActivate: [ConfirmedEmail],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: `${AppRoutes.Catalog}/${AppRoutes.Categories}`,
      },
      {
        path: '',
        canActivate: [EmailGuard],
        resolve: {
          petKinds: PetKindsResolver,
          petSizes: PetSizeResolver,
        },
        children: [
          {
            path: AppRoutes.Catalog,
            loadChildren: () => import('./catalog/catalog.module').then((m) => m.CatalogModule),
          },
          {
            path: AppRoutes.Admin,
            canActivate: [AdminGuard],
            loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
          },
        ],
      },
      {
        path: AppRoutes.Profile,
        loadComponent: () => import('./user-profile/components/user-profile/user-profile.component').then((m) => m.UserProfileComponent),
      },
    ],
  },
  {
    path: AppRoutes.PublicOffer,
    component: PublicOfferComponent,
  },
  {
    path: AppRoutes.Forbidden,
    component: PageForbiddenComponent,
  },
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
