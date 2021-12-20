import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoadImagesDialogComponent} from "../../load-images-dialog/load-images-dialog.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent{

  constructor(public dialog: MatDialog) { }

  openFileSelectorDialog() {
    this.dialog.open(LoadImagesDialogComponent, {
      width: '970px',
      disableClose: true,
    });
  }

}
