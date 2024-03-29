import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './user-profile-routing.module';
import { UserApi } from './services';
import { FillProfileComponent } from './containers';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [FillProfileComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedModule],
  providers: [UserApi],
})
export class UserProfile {}
