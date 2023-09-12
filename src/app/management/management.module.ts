import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ManagementRoutingModule } from './management-routing.module';
import { EquipmentRegistrationComponent } from './containers/equipment-registration/equipment-registration.component';
import { ApiService } from './services/api/api.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [EquipmentRegistrationComponent],
  imports: [CommonModule, ManagementRoutingModule, ReactiveFormsModule, SharedModule],
  providers: [ApiService],
})
export class ManagementModule {}
