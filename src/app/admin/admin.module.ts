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
import { EquipmentInfoComponent } from './components/equipment-info/equipment-info.component';
import { OrderNotificationModalComponent } from './components/order-notification-modal/order-notification-modal.component';
import { DateRangeModule } from '@app/features/date-range/date-range-module.module';
import { UsersComponent } from './containers/users/users.component';
import { BlockUserModalContentComponent } from './components/block-user-modal-content/block-user-modal-content.component';
import { UnblockUserModalContentComponent } from './components/unblock-user-modal-content/unblock-user-modal-content.component';

@NgModule({
  declarations: [
    EquipmentsComponent,
    ArchiveEquipmentModalComponent,
    BlockEquipmentModalComponent,
    EquipmentInfoComponent,
    OrderNotificationModalComponent,
    UsersComponent,
    BlockUserModalContentComponent,
    UnblockUserModalContentComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, ReactiveFormsModule, DateRangeModule],
  providers: [AdminApi, EquipmentResolverService, EquipmentsStatusesResolver, EquipmentCategoriesResolver],
})
export class AdminModule {}
