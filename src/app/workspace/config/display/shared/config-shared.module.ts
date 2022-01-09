import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {TooltipModule} from '../../../tooltip/tooltip.module';

import {SlidingInputComponent} from './sliding-input/sliding-input.component';
import {SimpleInputComponent} from './simple-input/simple-input.component';
import {ToggleInputComponent} from './toggle-input/toggle-input.component';

@NgModule({
  declarations: [SlidingInputComponent, SimpleInputComponent, ToggleInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    NgxMatSelectSearchModule,
    TooltipModule,
  ],
  exports: [SlidingInputComponent, SimpleInputComponent, ToggleInputComponent],
})
export class ConfigSharedModule {}
