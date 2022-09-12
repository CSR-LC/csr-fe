import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from "./components/main-header/main-header.component";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from "@angular/router";
import { ValidationErrorsDirective } from './directives/validation-errors/validation-errors.directive';

@NgModule({
  declarations: [
    MainHeaderComponent,
    PageNotFoundComponent,
    ValidationErrorsDirective,
  ],
  exports: [
    MainHeaderComponent,
    ValidationErrorsDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class SharedModule {}
