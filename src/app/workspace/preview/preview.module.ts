import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {StoreModule} from '@ngrx/store';

import {GaugesComponent} from './gauges/gauges.component';
import {LoadImagesDialogModule} from './load-images-dialog/load-images-dialog.module';
import {PreviewComponent} from './preview.component';
import {PREVIEW_FEATURE_KEY, previewReducer} from './state/preview.reducer';
import { TesterComponent } from './gauges/tester/tester.component';
import { ToolbarComponent } from './gauges/toolbar/toolbar.component';

@NgModule({
  declarations: [GaugesComponent, PreviewComponent, TesterComponent, ToolbarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatToolbarModule,
    FormsModule,
    LoadImagesDialogModule,
    ReactiveFormsModule,
    StoreModule.forFeature(PREVIEW_FEATURE_KEY, previewReducer),
  ],
  exports: [PreviewComponent],
})
export class PreviewModule {}
