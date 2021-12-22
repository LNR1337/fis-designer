import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WorkspaceModule} from './workspace/workspace.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    WorkspaceModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateSerializability: true,
        },
      },
    ),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
