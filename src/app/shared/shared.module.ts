import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { ValidationErrorsDirective } from './directives/validation-errors/validation-errors.directive';
import { BlockUiComponent } from '@shared/components/block-ui/block-ui.component';
import { HideTextDirective } from '@shared/directives/hide-text/hide-text.directive';
import { NotificationComponent } from './components/notification/notification.component';
import { PersonalInfoModalComponent } from './components/personal-info-modal/personal-info-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberDeclensionPipe } from '@shared/pipes/number-declension/number-declesion.pipe';
import { PublicOfferComponent } from '@shared/components/public-offer/public-offer.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { FakeInputComponent } from '@shared/components/fake-input/fake-input.component';
import { PageForbiddenComponent } from './components/page-forbidden/page-forbidden.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { TableComponent } from './components/table/table.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ModalLayoutComponent } from './components/modal-layout/modal-layout.component';
import { CatalogFilterComponent } from '@shared/components/catalog-filter/catalog-filter.component';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { mat_date_locale, mat_form_field_config, materialModules } from './material';

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
    CatalogFilterComponent,
  ],
  imports: [CommonModule, RouterModule, materialModules, ReactiveFormsModule, LayoutModule, NgxsFormPluginModule],
  exports: [
    NumberDeclensionPipe,
    HideTextDirective,
    MainHeaderComponent,
    ValidationErrorsDirective,
    BlockUiComponent,
    FakeInputComponent,
    materialModules,
    TableComponent,
    MainNavComponent,
    ModalLayoutComponent,
    CatalogFilterComponent,
    ReactiveFormsModule,
    NgxsFormPluginModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: mat_form_field_config },
    { provide: MAT_DATE_LOCALE, useValue: mat_date_locale },
  ],
})
export class SharedModule {}
