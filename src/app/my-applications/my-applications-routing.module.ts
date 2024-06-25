import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyApplicationsComponent } from '@app/my-applications/containers';
import { AppRoutes } from '@shared/constants/routes.enum';
import { MyApplicationDetailsComponent } from '@app/my-applications/components';

const routes: Routes = [
  {
    path: '',
    component: MyApplicationsComponent,
  },
  {
    path: `:id`,
    component: MyApplicationDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyApplicationsRoutingModule {}
