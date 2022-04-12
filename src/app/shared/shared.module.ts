import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainHeaderComponent} from "./components/main-header/main-header.component";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';




@NgModule({
    declarations: [
        MainHeaderComponent,
        PageNotFoundComponent,
    ],
    exports: [
        MainHeaderComponent
    ],
    imports: [
        CommonModule,
    ]
})
export class SharedModule { }
