import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MatToolbarModule} from '@angular/material/toolbar';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PreviewModule} from './workspace/preview/preview.module';
import {StoreModule} from "@ngrx/store";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PreviewModule,
    MatToolbarModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        // strictStateSerializability: true,
        // strictActionSerializability: true,
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
