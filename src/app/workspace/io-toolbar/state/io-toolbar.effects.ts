import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, exhaustMap, mergeMap, map, of, withLatestFrom} from 'rxjs';

import {loadConfigStateFromObject} from '../../config/state/config.actions';
import {CONFIG_FEATURE_KEY} from '../../config/state/config.reducer';
import {loadImagesStateFromObject} from '../../image-manager/state/images.actions';
import {IMAGES_FEATURE_KEY} from '../../image-manager/state/images.reducer';
import {selectImagesState} from '../../image-manager/state/images.selectors';
import {LocalStorageService} from '../../services/local-storage.service';
import {SnackBarService} from '../../services/snack-bar.service';
import {
  downloadBackgroundImagesAsBinary,
  downloadCompoundStateAsBinary,
  downloadCompoundStateAsJSON,
  downloadNeedleImagesAsBinary,
  loadCompoundStateFromBinary,
  loadCompoundStateFromJSON,
} from '../serialization-utils';
import {
  loadedCompoundState,
  loadExistingConfigNames,
  loadExistingConfigNamesSuccess,
  loadStateFromStorage,
  saveStateToStorage,
  downloadStateAsJSON,
  loadStateFromBufferJSON,
  loadStateFromBufferBinary,
  downloadStateAsBinary,
  downloadBackgroundAsBinary,
  downloadNeedlesAsBinary,
} from './io-toolbar.actions';
import {Action, Store} from '@ngrx/store';
import {selectCompoundState} from './io-toolbar.selectors';

@Injectable()
export class IoToolbarEffects {
  /** Effect to save current state to local storage. */
  saveStateToLocalStorage = createEffect(() =>
    this.actions$.pipe(
      ofType(saveStateToStorage),
      withLatestFrom(this.store.select(selectCompoundState)),
      mergeMap(([action, compoundState]) => {
        try {
          this.localStorageService.saveState(action.name, compoundState);
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
        withLatestFrom(this.store.select(selectCompoundState)),
        map(([action, compoundState]) => {
          try {
            downloadCompoundStateAsJSON(compoundState, action.name);
          } catch (e) {
            this.snackBar.error(`Error saving config to JSON: ${e}`);
          }
        })
      ),
    {dispatch: false}
  );

  /** Effect to save current state to binary file. */
  downloadStateAsBinary = createEffect(
    () =>
      this.actions$.pipe(
        ofType(downloadStateAsBinary),
        withLatestFrom(this.store.select(selectCompoundState)),
        map(([action, compoundState]) => {
          try {
            downloadCompoundStateAsBinary(compoundState, action.name);
          } catch (e) {
            this.snackBar.error(`Error saving binary config: ${e}`);
          }
        })
      ),
    {dispatch: false}
  );

  /** Effect to save background images to binary file. */
  downloadBackgroundAsBinary = createEffect(
    () =>
      this.actions$.pipe(
        ofType(downloadBackgroundAsBinary),
        withLatestFrom(this.store.select(selectImagesState)),
        map(([action, imagesState]) => {
          try {
            downloadBackgroundImagesAsBinary(imagesState, action.name);
          } catch (e) {
            this.snackBar.error(`Error saving backgrounds binary: ${e}`);
          }
        })
      ),
    {dispatch: false}
  );

  /** Effect to save needles and digits images to binary file. */
  downloadNeedlesAsBinary = createEffect(
    () =>
      this.actions$.pipe(
        ofType(downloadNeedlesAsBinary),
        withLatestFrom(this.store.select(selectImagesState)),
        map(([action, imagesState]) => {
          try {
            downloadNeedleImagesAsBinary(imagesState, action.name);
          } catch (e) {
            this.snackBar.error(`Error saving needles binary: ${e}`);
          }
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
          const compoundState = this.localStorageService.loadState(action.name);
          return [loadedCompoundState({compoundState})];
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
          const compoundState = loadCompoundStateFromJSON(action.loadedBuffer);
          return [loadedCompoundState({compoundState})];
        } catch (e) {
          this.snackBar.error(`Error loading config from file: ${e}`);
          return EMPTY;
        }
      })
    )
  );

  /** Effect to load state from settings binary array buffer. */
  loadStateFromBufferBinary = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStateFromBufferBinary),
      mergeMap(action => {
        try {
          const compoundState = loadCompoundStateFromBinary(action.loadedBuffer, action.fileName);
          return [loadedCompoundState({compoundState})];
        } catch (e) {
          this.snackBar.error(`Error loading config from file: ${e}`);
          return EMPTY;
        }
      })
    )
  );

  /** Effect to handle loaded compound state. */
  loadedCompoundState = createEffect(() =>
    this.actions$.pipe(
      ofType(loadedCompoundState),
      mergeMap(({compoundState}) => {
        return [
          loadConfigStateFromObject({
            object: compoundState[CONFIG_FEATURE_KEY],
          }),
          loadImagesStateFromObject({
            object: compoundState[IMAGES_FEATURE_KEY],
          }),
        ];
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
