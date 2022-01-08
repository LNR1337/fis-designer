import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {IoToolbarModule} from '../io-toolbar/io-toolbar.module';

import {GaugesComponent} from './gauges/gauges.component';
import {ImageManagerModule} from '../image-manager/image-manager.module';
import {PreviewComponent} from './preview.component';
import {PreviewEffects} from './state/preview.effects';
import {PREVIEW_FEATURE_KEY, previewReducer} from './state/preview.reducer';
import {TesterComponent} from './gauges/tester/tester.component';

@NgModule({
  declarations: [GaugesComponent, PreviewComponent, TesterComponent],
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
