import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {SnackBarComponent, SnackBarService} from './snack-bar.service';

@NgModule({
  declarations: [SnackBarComponent],
  providers: [SnackBarService],
  imports: [CommonModule, MatSnackBarModule, MatButtonModule, MatIconModule],
  exports: [],
})
export class ServicesModule {}
