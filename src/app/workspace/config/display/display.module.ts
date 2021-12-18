import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {DisplayComponent} from './display.component';
import {GaugeComponent} from './gauge/gauge.component';
import {NeedleComponent} from './needle/needle.component';
import {NumericalComponent} from './numerical/numerical.component';
import {SlidingInputComponent} from './sliding-input/sliding-input.component';
import {DisplayEffects} from './state/display.effects';
import {DISPLAY_FEATURE_KEY, displayReducer} from './state/display.reducer';

@NgModule({
  declarations: [
    DisplayComponent,
    GaugeComponent,
    NeedleComponent,
    NumericalComponent,
    SlidingInputComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSliderModule,
    MatTooltipModule,
    EffectsModule.forFeature([DisplayEffects]),
    StoreModule.forFeature(DISPLAY_FEATURE_KEY, displayReducer),
  ],
  exports: [DisplayComponent],
})
export class DisplayModule {}
