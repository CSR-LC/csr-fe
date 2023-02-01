import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { TokensGuard } from '@shared/guards/tokens.guard';
import { AdminResolver } from './admin/resolvers/admin.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalog/categories',
    pathMatch: 'full',
    // resolve: {
    //   user: AdminResolver,
    // }
  },
  {
    path: 'auth',
    canActivate: [TokensGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'catalog',
    canActivate: [AuthGuard],
    loadChildren: () => import('./catalog/catalog.module').then((m) => m.CatalogModule),
  },
  {
    path: 'management',
    canActivate: [AuthGuard],
    loadChildren: () => import('./management/management.module').then((m) => m.ManagementModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./user-profile/user-profile.module').then((m) => m.UserProfile),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminResolver],
})
export class AppRoutingModule {}
