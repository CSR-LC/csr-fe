import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './user-profile-routing.module';
import { UserApi } from './services';
import { FillProfileComponent } from './containers';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { UserProfileComponent } from './containers/user-profile/user-profile.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

@NgModule({
  declarations: [FillProfileComponent, UserProfileComponent, UserDetailsComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, MaterialModule, SharedModule],
  providers: [UserApi],
})
export class UserProfile {}
