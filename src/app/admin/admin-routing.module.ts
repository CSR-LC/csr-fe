import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentsComponent } from '@app/admin/containers/equipments/equipments.component';
import { AdminGuard } from '@app/shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'equipments',
  },
  {
    path: 'equipments',
    pathMatch: 'full',
    component: EquipmentsComponent,
    //canActivate: [AdminGuard],
  },
  {
    path: 'users',
    pathMatch: 'full',
    component: EquipmentsComponent,
    //canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminGuard],
})
export class AdminRoutingModule {}
