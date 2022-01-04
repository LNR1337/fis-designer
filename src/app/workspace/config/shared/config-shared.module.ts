import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {TooltipModule} from '../../tooltip/tooltip.module';
import {ColorInputComponent} from './color-input/color-input.component';
import {SelectInputComponent} from './select-input/select-input.component';

import {SlidingInputComponent} from './sliding-input/sliding-input.component';
import {ToggleInputComponent} from './toggle-input/toggle-input.component';

@NgModule({
  declarations: [
    ColorInputComponent,
    SelectInputComponent,
    SlidingInputComponent,
    ToggleInputComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    TooltipModule,
  ],
  exports: [ColorInputComponent, SelectInputComponent, SlidingInputComponent, ToggleInputComponent],
})
export class ConfigSharedModule {}
