import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { EquipmentsComponent } from './containers/equipments/equipments.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminApi, RolesResolverService } from '@app/admin/services';
import { EquipmentsStatusesResolver } from './resolvers/equipment-statuses/equipment-statuses.resolver';
import { EquipmentResolverService } from './services/equipment-resolver/equipment-resolver.service';
import { EquipmentCategoriesResolver } from './resolvers/equipment-categories/equipment-categories';
import { DateRangeModule } from '@app/features/date-range/date-range-module.module';
import { UsersComponent } from './containers/users/users.component';
import { RolesComponent } from '@app/admin/containers/roles/roles.component';
import { adminComponents } from './components/components';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [EquipmentsComponent, UsersComponent, adminComponents, RolesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DateRangeModule,
    MatAutocompleteModule,
  ],
  providers: [
    AdminApi,
    EquipmentResolverService,
    EquipmentsStatusesResolver,
    EquipmentCategoriesResolver,
    RolesResolverService,
  ],
})
export class AdminModule {}
