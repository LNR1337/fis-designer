import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {TooltipModule} from '../../tooltip/tooltip.module';
import {ConfigSharedModule} from '../shared/config-shared.module';

import {DisplayComponent} from './display.component';
import {GaugeComponent} from './gauge/gauge.component';
import {NeedleComponent} from './needle/needle.component';
import {NumericalSetupComponent} from './numerical-setup/numerical-setup.component';
import {NumericalComponent} from './numerical/numerical.component';
import {DisplayEffects} from './state/display.effects';
import {DISPLAY_FEATURE_KEY, displayReducer} from './state/display.reducer';

@NgModule({
  declarations: [
    DisplayComponent,
    GaugeComponent,
    NeedleComponent,
    NumericalComponent,
    NumericalSetupComponent,
  ],
  imports: [
    CommonModule,
    ConfigSharedModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    TooltipModule,
    EffectsModule.forFeature([DisplayEffects]),
    StoreModule.forFeature(DISPLAY_FEATURE_KEY, displayReducer),
  ],
  exports: [DisplayComponent],
})
export class DisplayModule {}
