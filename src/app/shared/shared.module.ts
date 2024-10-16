import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { mat_date_locale, mat_form_field_config, materialModules } from './material';
import { sharedComponents } from './components/components';
import { sharedDirectives } from './directives/directives';
import { sharedPipes } from './pipes/pipes';
import { USER_MODAL_CONFIG_DESKTOP, USER_MODAL_CONFIG_MOBILE } from '@shared/constants/user-modal-config';

function matDialogDefaultOptionsFactory(breakpointObserver: BreakpointObserver) {
  const isMobile = breakpointObserver.isMatched(Breakpoints.Handset);
  return isMobile ? USER_MODAL_CONFIG_MOBILE : USER_MODAL_CONFIG_DESKTOP;
}

@NgModule({
  imports: [CommonModule, RouterModule, materialModules, ReactiveFormsModule, LayoutModule, NgxsFormPluginModule],
  declarations: [sharedComponents, sharedDirectives, sharedPipes],
  exports: [
    sharedComponents,
    sharedDirectives,
    sharedPipes,
    materialModules,
    ReactiveFormsModule,
    NgxsFormPluginModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: mat_form_field_config },
    { provide: MAT_DATE_LOCALE, useValue: mat_date_locale },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useFactory: matDialogDefaultOptionsFactory,
      deps: [BreakpointObserver],
    },
  ],
})
export class SharedModule {}
