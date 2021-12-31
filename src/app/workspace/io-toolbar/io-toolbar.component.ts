import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {ImageManagerComponent} from '../image-manager/image-manager.component';
import {SnackBarService, SnackType} from '../services/snack-bar.service';
import {
  loadExistingConfigNames,
  loadStateFromBufferJSON,
  loadStateFromStorage,
  downloadStateAsJSON,
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
  disableSaveLoad = false;

  @ViewChild('configInput') configInput?: ElementRef;
  @ViewChild('nameInput') nameInput?: ElementRef;

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

  enableButtons() {
    this.disableSaveLoad = false;
  }

  disableButtons() {
    this.disableSaveLoad = true;
  }

  debounceButtons() {
    this.disableSaveLoad = true;
    setTimeout(() => this.enableButtons(), 500);
  }

  clearJSONinput() {
    if (this.configInput) {
      this.configInput.nativeElement.value = '';
    }
  }

  focusNameInput() {
    if (this.nameInput) {
      this.nameInput.nativeElement.focus();
    }
  }

  saveConfigLocal(name: string) {
    this.debounceButtons();
    if (!name) {
      this.snackBar.error('Cannot save under empty name.');
      this.focusNameInput();
      return;
    }
    this.store.dispatch(saveStateToStorage({name}));
  }

  saveConfigToJSON(name: string) {
    this.debounceButtons();
    if (!name) {
      this.snackBar.error('Cannot save under empty name.');
      this.focusNameInput();
      return;
    }
    this.store.dispatch(downloadStateAsJSON({name}));
  }

  loadConfigLocal(name: string) {
    this.debounceButtons();
    if (!name) {
      this.snackBar.error('Choose the config to load.');
      return;
    }
    if (!this.existingConfigNames.includes(name)) {
      this.snackBar.error(`Config "${name}" doesn't exist.`);
      return;
    }
    this.store.dispatch(loadStateFromStorage({name}));
  }

  onConfigSelected(event: Event) {
    this.disableButtons();
    const input = event.currentTarget as HTMLInputElement;
    if (input.files && input.files.length) {
      const reader = new FileReader();
      reader.onload = () => {
        if (!reader.result) return;
        this.store.dispatch(
          loadStateFromBufferJSON({
            loadedBuffer: reader.result as ArrayBuffer,
          })
        );
        this.enableButtons();
        this.clearJSONinput();
      };
      reader.onerror = () => {
        this.snackBar.error('Failed to read config file.');
        this.enableButtons();
        this.clearJSONinput();
      };
      reader.readAsArrayBuffer(input.files[0]);
    }
  }

  ngOnInit() {
    this.store.dispatch(loadExistingConfigNames());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
