import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthApi } from './services';
import {LoginComponent, PasswordResetComponent, SignUpComponent} from "./containers";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [LoginComponent, SignUpComponent, PasswordResetComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    FormsModule,
  ],
  providers: [
    AuthApi
  ]
})
export class AuthModule { }
