import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { EquipmentsComponent } from './containers/equipments/equipments.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminApi } from '@app/admin/services';
import { EquipmentsStatusesResolver } from './resolvers/equipment-statuses/equipment-statuses.resolver';
import { EquipmentResolverService } from './services/equipment-resolver/equipment-resolver.service';
import { EquipmentCategoriesResolver } from './resolvers/equipment-categories/equipment-categories';
import { DateRangeModule } from '@app/features/date-range/date-range-module.module';
import { UsersComponent } from './containers/users/users.component';
import { adminComponents } from './components/components';

@NgModule({
  declarations: [EquipmentsComponent, UsersComponent, adminComponents],
  imports: [CommonModule, AdminRoutingModule, SharedModule, ReactiveFormsModule, DateRangeModule],
  providers: [AdminApi, EquipmentResolverService, EquipmentsStatusesResolver, EquipmentCategoriesResolver],
})
export class AdminModule {}
