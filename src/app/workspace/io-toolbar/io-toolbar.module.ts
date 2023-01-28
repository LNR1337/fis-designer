import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {ImageManagerModule} from '../image-manager/image-manager.module';
import {TooltipModule} from '../tooltip/tooltip.module';
import {IoToolbarComponent} from './io-toolbar.component';
import {IoToolbarEffects} from './state/io-toolbar.effects';
import {IO_TOOLBAR_FEATURE_KEY, ioToolbarReducer} from './state/io-toolbar.reducer';

@NgModule({
  declarations: [IoToolbarComponent],
  imports: [
    CommonModule,
    ImageManagerModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonToggleModule,
    TooltipModule,
    EffectsModule.forFeature([IoToolbarEffects]),
    StoreModule.forFeature(IO_TOOLBAR_FEATURE_KEY, ioToolbarReducer),
  ],
  exports: [IoToolbarComponent],
})
export class IoToolbarModule {}
