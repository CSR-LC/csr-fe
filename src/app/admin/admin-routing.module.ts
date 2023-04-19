import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '@app/admin/containers/admin/admin.component';
import { AdminGuard } from '@app/shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminComponent,
    //canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminGuard],
})
export class AdminRoutingModule {}
