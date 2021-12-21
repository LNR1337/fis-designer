import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";

import {LoadImagesDialogModule} from '../load-images-dialog/load-images-dialog.module';
import {IoToolbarComponent} from './io-toolbar.component';
import {IoToolbarEffects} from "./state/io-toolbar.effects";
import {IO_TOOLBAR_FEATURE_KEY, ioToolbarReducer} from "./state/io-toolbar.reducer";

@NgModule({
  declarations: [IoToolbarComponent],
  imports: [CommonModule,
    FormsModule,
    LoadImagesDialogModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([IoToolbarEffects]),
    StoreModule.forFeature(IO_TOOLBAR_FEATURE_KEY, ioToolbarReducer),],
  exports: [IoToolbarComponent],
})
export class IoToolbarModule {}
