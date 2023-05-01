import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthApi } from './services';
import { LoginComponent, PasswordResetComponent, SignUpComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '@shared/shared.module';
import { AuthComponent } from '@app/auth/containers/auth/auth.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { ConfirmedEmailModalComponent } from './components/confirmed-email-modal/confirmed-email-modal.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    PasswordResetComponent,
    AuthComponent,
    EmailConfirmationComponent,
    ConfirmedEmailModalComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, MaterialModule, SharedModule, FormsModule],
  providers: [AuthApi],
})
export class AuthModule {}
