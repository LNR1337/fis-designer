import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatTooltipModule} from '@angular/material/tooltip';

import {ColorInputComponent} from './color-input/color-input.component';
import {SlidingInputComponent} from './sliding-input/sliding-input.component';
import {ToggleInputComponent} from './toggle-input/toggle-input.component';

@NgModule({
  declarations: [ColorInputComponent, SlidingInputComponent, ToggleInputComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  exports: [ColorInputComponent, SlidingInputComponent, ToggleInputComponent],
})
export class ConfigSharedModule {}
