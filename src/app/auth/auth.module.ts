import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthApi } from './services';
import {LoginComponent, SignUpComponent} from "./containers";

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [
    AuthApi
  ]
})
export class AuthModule { }
