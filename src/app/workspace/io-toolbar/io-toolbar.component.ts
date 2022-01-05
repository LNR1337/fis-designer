import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {changeProjectName} from '../config/state/config.actions';
import {selectConfigName} from '../config/state/config.selectors';
import {ImageManagerComponent} from '../image-manager/image-manager.component';
import {SnackBarService} from '../services/snack-bar.service';
import {loadCompoundStateFromBinary} from './serialization-utils';
import {
  loadExistingConfigNames,
  loadStateFromBufferJSON,
  loadStateFromStorage,
  downloadStateAsJSON,
  saveStateToStorage,
  downloadStateAsBinary,
  loadStateFromBufferBinary,
  downloadBackgroundAsBinary,
  downloadNeedlesAsBinary,
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
  configName = '';

  @ViewChild('jsonConfigInput') jsonConfigInput?: ElementRef;
  @ViewChild('binaryConfigInput') binaryConfigInput?: ElementRef;
  @ViewChild('configNameInput') configNameInput?: ElementRef;

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
    this.subscription.add(
      this.store.select(selectConfigName).subscribe(name => {
        this.configName = name ?? '';
      })
    );
  }

  openFileSelectorDialog() {
    this.dialog.open(ImageManagerComponent, {
      width: '950px',
      maxWidth: '100vw',
      maxHeight: '90vh',
      disableClose: true,
    });
  }

  onConfigNameChange(event: Event) {
    this.store.dispatch(changeProjectName({name: (event.target as HTMLInputElement).value}));
  }

  get hasConfigName(): boolean {
    if (!this.configName) {
      this.snackBar.error('Name your config first.');
      this.focusNameInput();
      return false;
    }
    return true;
  }

  clearFileInputs() {
    if (this.jsonConfigInput) {
      this.jsonConfigInput.nativeElement.value = '';
    }
    if (this.binaryConfigInput) {
      this.binaryConfigInput.nativeElement.value = '';
    }
  }

  focusNameInput() {
    if (this.configNameInput) {
      this.configNameInput.nativeElement.focus();
    }
  }

  saveConfigLocal() {
    if (!this.hasConfigName) {
      return;
    }
    this.store.dispatch(saveStateToStorage({name: this.configName}));
  }

  saveConfigToJSON() {
    if (!this.hasConfigName) {
      return;
    }
    this.store.dispatch(downloadStateAsJSON({name: this.configName}));
  }

  loadConfigLocal(name: string) {
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

  saveConfigAsBinary() {
    if (!this.hasConfigName) {
      return;
    }
    this.store.dispatch(downloadStateAsBinary({name: this.configName}));
  }

  saveBackgroundAsBinary() {
    if (!this.hasConfigName) {
      return;
    }
    this.store.dispatch(downloadBackgroundAsBinary({name: this.configName}));
  }

  saveNeedlesAsBinary() {
    if (!this.hasConfigName) {
      return;
    }
    this.store.dispatch(downloadNeedlesAsBinary({name: this.configName}));
  }

  readFileEvent(event: Event, callback: (result: ArrayBuffer, fileName: string) => void) {
    const input = event.currentTarget as HTMLInputElement;
    if (input.files && input.files.length) {
      const reader = new FileReader();
      const name = input.files[0].name;
      reader.onload = () => {
        if (!reader.result) {
          this.snackBar.error('Failed to read config file.');
          return;
        }
        callback(reader.result as ArrayBuffer, name);
      };
      reader.onerror = () => {
        this.snackBar.error('Failed to read config file.');
      };
      reader.onloadend = () => {
        this.clearFileInputs();
      };
      reader.readAsArrayBuffer(input.files[0]);
    }
  }

  onConfigSelected(event: Event) {
    this.readFileEvent(event, (result, fileName) => {
      this.store.dispatch(
        loadStateFromBufferJSON({
          loadedBuffer: result,
        })
      );
    });
  }

  onBinaryConfigSelected(event: Event) {
    this.readFileEvent(event, (result, fileName) => {
      this.store.dispatch(
        loadStateFromBufferBinary({
          loadedBuffer: result,
          fileName: fileName.split('.')[0],
        })
      );
    });
  }

  ngOnInit() {
    this.store.dispatch(loadExistingConfigNames());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
