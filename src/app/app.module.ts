import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { AuthState } from './auth/store';
import { interceptors } from '@shared/interceptors/intercetors';
import { guards } from '@shared/guards/guerds';
import { MaterialModule } from '@app/material/material.module';
import { SharedModule } from "@shared/shared.module";
import { AuthState } from "./auth/store";
import { interceptors } from "@shared/interceptors/intercetors";
import { guards } from "@shared/guards/guerds";
import {ngxsConfig} from "@app/ngxs.config";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState], ngxsConfig),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([AuthState], {
      developmentMode: !environment.production,
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [...guards, ...interceptors],
  bootstrap: [AppComponent],
})
export class AppModule {}
