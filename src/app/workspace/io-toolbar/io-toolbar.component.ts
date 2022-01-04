import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {changeProjectName} from '../config/state/config.actions';
import {selectConfigName} from '../config/state/config.selectors';
import {ImageManagerComponent} from '../image-manager/image-manager.component';
import {
  downloadBackgroundAsBinary,
  downloadNeedlesAsBinary,
} from '../image-manager/state/images.actions';
import {SnackBarService} from '../services/snack-bar.service';
import {
  loadExistingConfigNames,
  loadStateFromBufferJSON,
  loadStateFromStorage,
  downloadStateAsJSON,
  saveStateToStorage,
  downloadStateAsBinary,
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

  @ViewChild('configInput') configInput?: ElementRef;
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

  clearJSONinput() {
    if (this.configInput) {
      this.configInput.nativeElement.value = '';
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

  onConfigSelected(event: Event) {
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
        this.clearJSONinput();
      };
      reader.onerror = () => {
        this.snackBar.error('Failed to read config file.');
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
