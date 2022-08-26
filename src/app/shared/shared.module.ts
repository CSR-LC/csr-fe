import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from "./components/main-header/main-header.component";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from "@angular/router";
import { ConsentComponent } from './components/consent/consent.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    MainHeaderComponent,
    PageNotFoundComponent,
    ConsentComponent,
  ],
  exports: [
    MainHeaderComponent,
    ConsentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class SharedModule { }
