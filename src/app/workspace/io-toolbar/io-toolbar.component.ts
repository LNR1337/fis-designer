import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {ImageManagerComponent} from '../image-manager/image-manager.component';
import {SnackBarService, SnackType} from '../services/snack-bar.service';
import {
  loadExistingConfigNames,
  loadStateFromStorage,
  saveStateToJSON,
  saveStateToStorage,
} from './state/io-toolbar.actions';
import {selectExistingConfigNames} from './state/io-toolbar.selectors';

@Component({
  selector: 'app-io-toolbar',
  templateUrl: './io-toolbar.component.html',
  styleUrls: ['./io-toolbar.component.scss'],
})
export class IoToolbarComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  existingConfigNames: string[] = [];

  constructor(
    public dialog: MatDialog,
    private readonly store: Store,
    private readonly snackBar: SnackBarService
  ) {
    this.subscription.add(
      this.store.select(selectExistingConfigNames).subscribe(names => {
        this.existingConfigNames = names ?? [];
      })
    );
  }

  openFileSelectorDialog() {
    this.dialog.open(ImageManagerComponent, {
      width: '970px',
      disableClose: true,
    });
  }

  saveConfig(name: string) {
    if (!name) {
      this.snackBar.open('Cannot save under empty name.', SnackType.ERROR);
      return;
    }
    this.store.dispatch(saveStateToStorage({name}));
  }

  saveConfigToJSON(name: string) {
    if (!name) {
      this.snackBar.open('Cannot save under empty name.', SnackType.ERROR);
      return;
    }
    this.store.dispatch(saveStateToJSON({name}));
  }

  loadConfig(name: string) {
    if (!name) {
      this.snackBar.open('Choose name of the config to load.', SnackType.ERROR);
      return;
    }
    if (!this.existingConfigNames.includes(name)) {
      this.snackBar.open(`Config "${name}" doesn't exist.`, SnackType.ERROR);
      return;
    }
    this.store.dispatch(loadStateFromStorage({name}));
  }

  ngOnInit() {
    this.store.dispatch(loadExistingConfigNames());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
