import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { TokensGuard } from '@shared/guards/tokens.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [TokensGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'categories',
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
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
