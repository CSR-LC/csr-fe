import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MyApplicationsComponent } from '@app/my-applications/containers';
import { MyApplicationComponent, MyApplicationDetailsComponent } from '@app/my-applications/components';
import { MyApplicationsApi, MyApplicationsController } from '@app/my-applications/services';
import { MyApplicationsRoutingModule } from '@app/my-applications/my-applications-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DropdownFilterComponent } from '@shared/components';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { MyApplicationsFilterProvider } from '@app/my-applications/services/providers/my-applications-filter-provider';
import { InfiniteScrollService } from '@shared/services/infinite-scroll/infinite-scroll.service';

@NgModule({
  declarations: [MyApplicationsComponent, MyApplicationComponent, MyApplicationDetailsComponent],
  imports: [
    CommonModule,
    MyApplicationsRoutingModule,
    SharedModule,
    DropdownFilterComponent,
    LoaderComponent,
    NgOptimizedImage,
  ],
  providers: [MyApplicationsApi, MyApplicationsController, MyApplicationsFilterProvider, InfiniteScrollService],
})
export class MyApplicationsModule {}
