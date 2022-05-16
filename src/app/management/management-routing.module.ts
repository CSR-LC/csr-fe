import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentRegistrationComponent } from './containers/equipment-registration/equipment-registration.component';

const routes: Routes = [
  {
    path: 'equipment-registration',
    component: EquipmentRegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
