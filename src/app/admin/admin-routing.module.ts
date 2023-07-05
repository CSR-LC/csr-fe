import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentsComponent } from '@app/admin/containers/equipments/equipments.component';
import { AppRoutes } from '@app/shared/constants/routes.enum';
import { AdminGuard } from '@app/shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.Equipments,
  },
  {
    path: AppRoutes.Equipments,
    pathMatch: 'full',
    component: EquipmentsComponent,
  },
  {
    path: AppRoutes.Users,
    pathMatch: 'full',
    component: EquipmentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminGuard],
})
export class AdminRoutingModule {}
