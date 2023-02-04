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
import { FormsModule } from '@angular/forms';
import { NumberDeclensionPipe } from '@shared/pipes/number-declension/number-declesion.pipe';

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
  ],
  exports: [
    NumberDeclensionPipe,
    HideTextDirective,
    MainHeaderComponent,
    ValidationErrorsDirective,
    BlockUiComponent,
    MatSnackBarModule,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, MatSnackBarModule, FormsModule],
})
export class SharedModule {}
