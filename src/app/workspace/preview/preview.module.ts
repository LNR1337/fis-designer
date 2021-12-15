import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { StoreModule } from '@ngrx/store';

import { GaugesComponent } from './gauges/gauges.component';
import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { PreviewComponent } from './preview.component';
import { PREVIEW_FEATURE_KEY, previewReducer } from './state/preview.reducer';
import { FileButtonComponent } from './image-selector/file-button/file-button.component';

@NgModule({
  declarations: [
    GaugesComponent,
    ImageSelectorComponent,
    PreviewComponent,
    FileButtonComponent,
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
  exports: [PreviewComponent],
})
export class PreviewModule {}
