import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EquipmentsComponent } from './containers/equipments/equipments.component';
import { SharedModule } from '@shared/shared.module';
import { ArchiveEquipmentModalComponent } from './components/archive-equipment-modal/archive-equipment-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminApi } from '@app/admin/services';
import { BlockEquipmentModalComponent } from './components/block-equipment-modal/block-equipment-modal.component';
import { EquipmentsStatusesResolver } from './resolvers/equipment-statuses/equipment-statuses.resolver';
import { EquipmentResolverService } from './services/equipment-resolver/equipment-resolver.service';
import { EquipmentCategoriesResolver } from './resolvers/equipment-categories/equipment-categories';

@NgModule({
  declarations: [EquipmentsComponent, ArchiveEquipmentModalComponent, BlockEquipmentModalComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [AdminApi, EquipmentResolverService, EquipmentsStatusesResolver, EquipmentCategoriesResolver],
})
export class AdminModule {}
