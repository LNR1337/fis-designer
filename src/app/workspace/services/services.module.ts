import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SnackBarService, SnackBarComponent } from './snack-bar.service';

@NgModule({
  declarations: [SnackBarComponent],
  providers: [SnackBarService],
  imports: [CommonModule, MatSnackBarModule, MatButtonModule, MatIconModule],
  exports: [],
})
export class ServicesModule {}
