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
import { PersonalInfoModalComponent } from './components/personal-info-modal/personal-info-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberDeclensionPipe } from '@shared/pipes/number-declension/number-declesion.pipe';
import { PublicOfferComponent } from '@shared/components/public-offer/public-offer.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';
import { SizePipe } from './pipes/size.pipe';
import { ApiService } from './services/api/api.service';

@NgModule({
  declarations: [
    NumberDeclensionPipe,
    BlockUiComponent,
    HideTextDirective,
    MainHeaderComponent,
    PageNotFoundComponent,
    ValidationErrorsDirective,
    NotificationComponent,
    PersonalInfoModalComponent,
    PublicOfferComponent,
    FilterComponent,
    FilterModalComponent,
    SizePipe,
  ],
  exports: [
    NumberDeclensionPipe,
    HideTextDirective,
    MainHeaderComponent,
    ValidationErrorsDirective,
    BlockUiComponent,
    MatSnackBarModule,
    SizePipe,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, MatSnackBarModule, ReactiveFormsModule, FormsModule],
  providers: [ApiService],
})
export class SharedModule {}
