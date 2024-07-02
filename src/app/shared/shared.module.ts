import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { mat_date_locale, mat_form_field_config, materialModules } from './material';
import { sharedComponents } from './components/components';
import { sharedDirectives } from './directives/directives';
import { sharedPipes } from './pipes/pipes';
import { InfiniteScrollDirective } from './directives/infinite-scroll/infinite-scroll.directive';

@NgModule({
  imports: [CommonModule, RouterModule, materialModules, ReactiveFormsModule, LayoutModule, NgxsFormPluginModule],
  declarations: [sharedComponents, sharedDirectives, sharedPipes, InfiniteScrollDirective],
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
  ],
})
export class SharedModule {}
