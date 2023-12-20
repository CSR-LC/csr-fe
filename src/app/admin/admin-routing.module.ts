import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentsComponent } from '@app/admin/containers/equipments/equipments.component';
import { AppRoutes } from '@app/shared/constants/routes.enum';
import { AdminGuard } from '@app/shared/guards/admin.guard';
import { EquipmentsStatusesResolver } from './resolvers/equipment-statuses/equipment-statuses.resolver';
import { EquipmentCategoriesResolver } from './resolvers/equipment-categories/equipment-categories';
import { UsersComponent } from '@app/admin/containers/users/users.component';
import { RolesComponent } from '@app/admin/containers/roles/roles.component';
import { rolesResolver } from '@app/admin/resolvers/roles/roles.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.Equipments,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.Equipments,
    resolve: {
      equipmentsStatuses: EquipmentsStatusesResolver,
      equipmentCategories: EquipmentCategoriesResolver,
    },
    pathMatch: 'full',
    component: EquipmentsComponent,
  },
  {
    path: AppRoutes.Users,
    pathMatch: 'full',
    component: UsersComponent,
  },
  {
    path: AppRoutes.Roles,
    resolve: {
      roles: rolesResolver,
    },
    pathMatch: 'full',
    component: RolesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminGuard],
})
export class AdminRoutingModule {}
