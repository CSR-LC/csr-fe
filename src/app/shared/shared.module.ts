import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { ValidationErrorsDirective } from './directives/validation-errors/validation-errors.directive';
import { BlockUiComponent } from '@shared/components/block-ui/block-ui.component';
import { MaterialModule } from '@app/material/material.module';
import { HideTextDirective } from '@shared/directives/hide-text/hide-text.directive';
import { NotificationComponent } from './components/notification/notification.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DaysPipe } from '@shared/pipes/days/days.pipe';
import { SizePipe } from './pipes/size.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';
import { CatalogApi } from './services';
import { PetKindsResolver } from './resolver/pet-kinds.resolver';

@NgModule({
  declarations: [
    DaysPipe,
    BlockUiComponent,
    HideTextDirective,
    MainHeaderComponent,
    PageNotFoundComponent,
    ValidationErrorsDirective,
    NotificationComponent,
    SizePipe,
    FilterComponent,
    FilterModalComponent,
  ],
  exports: [
    DaysPipe,
    HideTextDirective,
    MainHeaderComponent,
    ValidationErrorsDirective,
    BlockUiComponent,
    MatSnackBarModule,
    SizePipe,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, MatSnackBarModule,FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CatalogApi, PetKindsResolver],
})
export class SharedModule {}
