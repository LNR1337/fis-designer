import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'

import {StoreModule} from '@ngrx/store';

import {GaugesComponent} from './gauges/gauges.component';
import {ImageSelectorDialog} from './image-selector-dialog/image-selector.component';
import {PreviewComponent} from "./preview.component";
import {PREVIEW_FEATURE_KEY, previewReducer} from "./state/preview.reducer";

@NgModule({
  declarations: [
    GaugesComponent,
    ImageSelectorDialog,
    PreviewComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(PREVIEW_FEATURE_KEY, previewReducer),
  ],
  exports: [PreviewComponent]
})
export class PreviewModule {
}
