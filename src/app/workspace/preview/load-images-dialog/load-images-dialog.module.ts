import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';

import {ImageSelectorComponent} from './image-selector/image-selector.component';
import {LoadImagesDialogComponent} from './load-images-dialog.component';

@NgModule({
  declarations: [LoadImagesDialogComponent, ImageSelectorComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [LoadImagesDialogComponent],
})
export class LoadImagesDialogModule {}
