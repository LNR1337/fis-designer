import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {ResizableModule} from 'angular-resizable-element';

import {ConfigComponent} from './config.component';
import {DisplayModule} from './display/display.module';
import {ConfigEffects} from './state/config.effects';
import {configReducer, CONFIG_FEATURE_KEY} from './state/config.reducer';

@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    DisplayModule,
    MatTabsModule,
    ResizableModule,
    EffectsModule.forFeature([ConfigEffects]),
    StoreModule.forFeature(CONFIG_FEATURE_KEY, configReducer),
  ],
  exports: [ConfigComponent],
})
export class ConfigModule {}
