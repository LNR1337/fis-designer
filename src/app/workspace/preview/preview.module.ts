import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {IoToolbarModule} from '../io-toolbar/io-toolbar.module';

import {RendererComponent} from './renderer/renderer.component';
import {ImageManagerModule} from '../image-manager/image-manager.module';
import {PreviewComponent} from './preview.component';
import {PreviewEffects} from './state/preview.effects';
import {PREVIEW_FEATURE_KEY, previewReducer} from './state/preview.reducer';
import {TesterComponent} from './renderer/tester/tester.component';

@NgModule({
  declarations: [RendererComponent, PreviewComponent, TesterComponent],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    IoToolbarModule,
    ImageManagerModule,
    EffectsModule.forFeature([PreviewEffects]),
    StoreModule.forFeature(PREVIEW_FEATURE_KEY, previewReducer),
  ],
  exports: [PreviewComponent],
})
export class PreviewModule {}
