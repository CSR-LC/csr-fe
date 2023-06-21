import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentRegistrationComponent } from './containers/equipment-registration/equipment-registration.component';
import { AppRoutes } from '@app/shared/constants/routes.enum';

const routes: Routes = [
  {
    path: AppRoutes.EquipmentRegistration,
    component: EquipmentRegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
