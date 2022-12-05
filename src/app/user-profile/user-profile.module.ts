import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './user-profile-routing.module';
import { UserApi } from './services';
import { FillProfileComponent } from './containers';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [FillProfileComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, MaterialModule],
  providers: [UserApi],
})
export class UserProfile {}
