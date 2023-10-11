import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentsComponent } from '@app/admin/containers/equipments/equipments.component';
import { AppRoutes } from '@app/shared/constants/routes.enum';
import { AdminGuard } from '@app/shared/guards/admin.guard';
import { UsersComponent } from '@app/admin/containers/users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.Equipments,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.Equipments,
    pathMatch: 'full',
    component: EquipmentsComponent,
  },
  {
    path: AppRoutes.Users,
    pathMatch: 'full',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminGuard],
})
export class AdminRoutingModule {}
