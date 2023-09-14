import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { TokensGuard } from '@shared/guards/tokens.guard';
import { PetKindsResolver } from '@shared/resolvers/pet-kinds.resolver';
import { PetSizeResolver } from '@shared/resolvers/pet-size.resolver';
import { PublicOfferComponent } from '@app/shared/components/public-offer/public-offer.component';
import { PageForbiddenComponent } from './shared/components/page-forbidden/page-forbidden.component';
import { AppRoutes } from './shared/constants/routes.enum';
import { AdminGuard } from './shared/guards/admin.guard';

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
    resolve: {
      petKinds: PetKindsResolver,
      petSizes: PetSizeResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: `${AppRoutes.Catalog}/${AppRoutes.Categories}`,
      },
      {
        path: AppRoutes.Catalog,
        loadChildren: () => import('./catalog/catalog.module').then((m) => m.CatalogModule),
      },
      {
        path: AppRoutes.Management,
        loadChildren: () => import('./management/management.module').then((m) => m.ManagementModule),
      },
      {
        path: AppRoutes.Profile,
        loadChildren: () => import('./user-profile/user-profile.module').then((m) => m.UserProfile),
      },
      {
        path: AppRoutes.Admin,
        canActivate: [AdminGuard],
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
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
