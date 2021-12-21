import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {saveStateToStorage} from "../../../config/display/state/display.actions";
import {selectExistingConfigNames} from "../../../config/display/state/display.selectors";
import {LoadImagesDialogComponent} from "../../load-images-dialog/load-images-dialog.component";
import {selectAllImages} from "../../state/preview.selectors";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy {
  subscription = new Subscription();
  existingConfigNames: string[] = [];

  constructor(public dialog: MatDialog, private readonly store: Store) {
    this.subscription.add(this.store.select(selectExistingConfigNames).subscribe((names) => {
      this.existingConfigNames = names ?? [];
      console.log(names);
    }));
  }

  openFileSelectorDialog() {
    this.dialog.open(LoadImagesDialogComponent, {
      width: '970px', disableClose: true,
    });
  }

  saveDisplayState() {
    this.store.dispatch(saveStateToStorage({name: 'test'}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
