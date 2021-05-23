import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
import { HttpClientModule } from '@angular/common/http';
import { DevExtremeModule, DxButtonModule, DxDataGridModule, DxPopupModule, DxScrollViewModule, DxToastModule } from 'devextreme-angular';
import { DxiItemModule } from 'devextreme-angular/ui/nested';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AmplifyUIAngularModule,
    DevExtremeModule,
    DxDataGridModule,
    DxPopupModule,
    DxScrollViewModule,
    DxiItemModule,
    DxButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
