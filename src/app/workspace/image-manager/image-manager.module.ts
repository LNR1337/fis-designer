import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {ImageSelectorComponent} from './image-selector/image-selector.component';
import {ImageManagerComponent} from './image-manager.component';
import {ImagesEffects} from './state/images.effects';
import {IMAGES_FEATURE_KEY, imagesReducer} from './state/images.reducer';

@NgModule({
  declarations: [ImageManagerComponent, ImageSelectorComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    EffectsModule.forFeature([ImagesEffects]),
    StoreModule.forFeature(IMAGES_FEATURE_KEY, imagesReducer),
  ],
  exports: [ImageManagerComponent],
})
export class ImageManagerModule {}
