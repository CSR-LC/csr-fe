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
import { ReactiveFormsModule } from '@angular/forms';
import { NumberDeclensionPipe } from '@shared/pipes/number-declension/number-declesion.pipe';
import { PublicOfferComponent } from '@shared/components/public-offer/public-offer.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { FakeInputComponent } from '@shared/components/fake-input/fake-input.component';
import { PageForbiddenComponent } from './components/page-forbidden/page-forbidden.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ModalLayoutComponent } from './components/modal-layout/modal-layout.component';

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
    ConfirmationModalComponent,
    FakeInputComponent,
    PageForbiddenComponent,
    InfoModalComponent,
    TableComponent,
    MainNavComponent,
    ModalLayoutComponent,
  ],
  exports: [
    NumberDeclensionPipe,
    HideTextDirective,
    MainHeaderComponent,
    ValidationErrorsDirective,
    BlockUiComponent,
    MatSnackBarModule,
    FakeInputComponent,
    MaterialModule,
    MatPaginatorModule,
    MatTableModule,
    TableComponent,
    MainNavComponent,
    ModalLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
})
export class SharedModule {}
