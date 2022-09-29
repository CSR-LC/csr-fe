import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from "./components/main-header/main-header.component";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from "@angular/router";
import { ValidationErrorsDirective } from './directives/validation-errors/validation-errors.directive';
import {BlockUiComponent} from "@shared/components/block-ui/block-ui.component";
import {MaterialModule} from "@app/material/material.module";

@NgModule({
  declarations: [
    BlockUiComponent,
    MainHeaderComponent,
    PageNotFoundComponent,
    ValidationErrorsDirective,
  ],
  exports: [
    MainHeaderComponent,
    ValidationErrorsDirective,
    BlockUiComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ]
})
export class SharedModule {}
