import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { AuthState } from './auth/store';
import { interceptors } from '@shared/interceptors/intercetors';
import { guards } from '@shared/guards/guards';
import { ngxsConfig } from '@app/ngxs.config';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState], ngxsConfig),
    NgxsReduxDevtoolsPluginModule.forRoot(),

    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [...guards, ...interceptors],
  bootstrap: [AppComponent],
})
export class AppModule {}
