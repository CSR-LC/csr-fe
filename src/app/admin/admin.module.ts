import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './containers/admin/admin.component';
import { SharedModule } from '@shared/shared.module';
import { ArchiveEquipmentModalComponent } from './components/archive-equipment-modal/archive-equipment-modal.component';
import { BlockEquipmentModalComponent } from './components/block-equipment-modal./block-equipment-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminComponent, ArchiveEquipmentModalComponent, BlockEquipmentModalComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, ReactiveFormsModule],
})
export class AdminModule {}
