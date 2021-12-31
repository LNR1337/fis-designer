import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, exhaustMap, mergeMap, map, of, withLatestFrom} from 'rxjs';
import {saveAs} from 'file-saver';

import {loadDisplayStateFromObject} from '../../config/display/state/display.actions';
import {DISPLAY_FEATURE_KEY} from '../../config/display/state/display.reducer';
import {loadImagesStateFromObject} from '../../image-manager/state/images.actions';
import {IMAGES_FEATURE_KEY} from '../../image-manager/state/images.reducer';
import {LocalStorageService} from '../../services/local-storage';
import {SnackBarService} from '../../services/snack-bar.service';
import {
  loadedSerializedState,
  loadExistingConfigNames,
  loadExistingConfigNamesSuccess,
  loadStateFromStorage,
  saveStateToStorage,
  downloadStateAsJSON,
  loadStateFromBufferJSON,
} from './io-toolbar.actions';
import {Action, Store} from '@ngrx/store';
import {selectStateToSave} from './io-toolbar.selectors';

@Injectable()
export class IoToolbarEffects {
  /** Effect to save current state to local storage. */
  saveStateToLocalStorage = createEffect(() =>
    this.actions$.pipe(
      ofType(saveStateToStorage),
      withLatestFrom(this.store.select(selectStateToSave)),
      mergeMap(([action, stateToSave]) => {
        try {
          this.localStorageService.saveState(action.name, stateToSave);
        } catch (e) {
          this.snackBar.error(`Error saving config: ${e}`);
        }
        return of(loadExistingConfigNames());
      })
    )
  );

  /** Effect to save current state to JSON file. */
  downloadStateAsJSON = createEffect(
    () =>
      this.actions$.pipe(
        ofType(downloadStateAsJSON),
        withLatestFrom(this.store.select(selectStateToSave)),
        map(([action, stateToSave]) => {
          const blob = new Blob([JSON.stringify(stateToSave)], {type: 'application/json'});
          saveAs(blob, `${action.name}.fis-designer.json`);
        })
      ),
    {dispatch: false}
  );

  /** Effect to load state from local storage. */
  loadStateFromStorage = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStateFromStorage),
      mergeMap(action => {
        try {
          const loadedFromState = this.localStorageService.loadState(action.name);
          return [loadedSerializedState({loadedObject: loadedFromState})];
        } catch (e) {
          this.snackBar.error(`Error loading config from local storage: ${e}`);
          return EMPTY;
        }
      })
    )
  );

  /** Effect to load state from JSON array buffer. */
  loadStateFromBufferJSON = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStateFromBufferJSON),
      mergeMap(action => {
        try {
          const encoder = new TextDecoder('utf-8');
          const loadedFromFile = JSON.parse(encoder.decode(action.loadedBuffer));
          return [loadedSerializedState({loadedObject: loadedFromFile})];
        } catch (e) {
          this.snackBar.error(`Error loading config from file: ${e}`);
          return EMPTY;
        }
      })
    )
  );

  /** Effect to load state from an object. */
  loadedSerializedState = createEffect(() =>
    this.actions$.pipe(
      ofType(loadedSerializedState),
      mergeMap(({loadedObject}) => {
        const loadActions: Action[] = [];
        if (loadedObject.hasOwnProperty(DISPLAY_FEATURE_KEY)) {
          loadActions.push(
            loadDisplayStateFromObject({
              object: (loadedObject as any)[DISPLAY_FEATURE_KEY],
            })
          );
        }
        if (loadedObject.hasOwnProperty(IMAGES_FEATURE_KEY)) {
          loadActions.push(
            loadImagesStateFromObject({
              object: (loadedObject as any)[IMAGES_FEATURE_KEY],
            })
          );
        }
        return loadActions;
      })
    )
  );

  /** Effect to load existing config names from local storage and emit loaded action. */
  loadExistingConfigNames = createEffect(() =>
    this.actions$.pipe(
      ofType(loadExistingConfigNames),
      exhaustMap(() => {
        const configNames = this.localStorageService.getSavedNames();
        return [loadExistingConfigNamesSuccess({configNames})];
      })
    )
  );

  constructor(
    private actions$: Actions,
    private readonly store: Store,
    private readonly localStorageService: LocalStorageService,
    private readonly snackBar: SnackBarService
  ) {}
}
