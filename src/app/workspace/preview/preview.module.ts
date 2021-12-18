import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {StoreModule} from '@ngrx/store';

import {GaugesComponent} from './gauges/gauges.component';
import {LoadImagesDialogModule} from './load-images-dialog/load-images-dialog.module';
import {PreviewComponent} from './preview.component';
import {PREVIEW_FEATURE_KEY, previewReducer} from './state/preview.reducer';

@NgModule({
  declarations: [GaugesComponent, PreviewComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    LoadImagesDialogModule,
    ReactiveFormsModule,
    StoreModule.forFeature(PREVIEW_FEATURE_KEY, previewReducer),
  ],
  exports: [PreviewComponent],
})
export class PreviewModule {}
