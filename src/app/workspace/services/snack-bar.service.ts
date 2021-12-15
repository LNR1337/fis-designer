import { Component, Injectable, Inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

/** Available snack bar types. */
export enum SnackType {
  INFO = 'info',
  WARNING = 'warning_amber',
  ERROR = 'error_outline',
}

@Component({
  selector: 'app-snackbar',
  templateUrl: './snack-bar.service.html',
  styleUrls: ['./snack-bar.service.scss'],
})
export class SnackBarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private readonly snackBarRef: MatSnackBarRef<SnackBarComponent>
  ) {}

  close() {
    this.snackBarRef.dismiss();
  }
}

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  open(
    message: string,
    type: SnackType = SnackType.INFO,
    action: string = 'Dismiss',
    duration: number = 5000
  ) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration,
      data: { action, type, message },
    });
  }
}
