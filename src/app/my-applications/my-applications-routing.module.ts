import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyApplicationsComponent } from '@app/my-applications/containers';
import { MyApplicationDetailsComponent } from '@app/my-applications/components';
import { myApplicationDetailsResolver } from '@app/my-applications/resolvers/my-application-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: MyApplicationsComponent,
  },
  {
    path: `:id`,
    component: MyApplicationDetailsComponent,
    resolve: {
      myApplicationDetails: myApplicationDetailsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyApplicationsRoutingModule {}
