import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, exhaustMap, mergeMap, of, withLatestFrom} from 'rxjs';
import {loadDisplayStateFromObject} from '../../config/display/state/display.actions';
import {DISPLAY_FEATURE_KEY} from '../../config/display/state/display.reducer';
import {selectDisplayState} from '../../config/display/state/display.selectors';
import {loadImagesStateFromObject} from '../../image-manager/state/images.actions';
import {IMAGES_FEATURE_KEY} from '../../image-manager/state/images.reducer';
import {selectImagesState} from '../../image-manager/state/images.selectors';
import {LocalStorageService} from '../../services/local-storage';
import {
  loadExistingConfigNames,
  loadExistingConfigNamesSuccess,
  loadStateFromStorage,
  saveStateToStorage,
} from './io-toolbar.actions';
import {Action, Store} from '@ngrx/store';

@Injectable()
export class IoToolbarEffects {
  /** Effect to save current state to local storage. */
  saveStateToLocalStorage = createEffect(() =>
    this.actions$.pipe(
      ofType(saveStateToStorage),
      withLatestFrom(this.store.select(selectDisplayState)),
      withLatestFrom(this.store.select(selectImagesState)),
      mergeMap(([[action, displayState], imagesState]) => {
        const stateToSave = {
          [DISPLAY_FEATURE_KEY]: displayState,
          [IMAGES_FEATURE_KEY]: imagesState,
        };
        try {
          this.localStorageService.saveState(action.name, stateToSave);
        } catch (e) {
          console.error(`Error saving config: ${e}`);
        }
        return of(loadExistingConfigNames());
      })
    )
  );

  /** Effect to load state from local storage. */
  loadStateFromStorage = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStateFromStorage),
      mergeMap(action => {
        try {
          const loadedFromState = this.localStorageService.loadState(action.name);
          const loadActions: Action[] = [];
          if (loadedFromState.hasOwnProperty(DISPLAY_FEATURE_KEY)) {
            loadActions.push(
              loadDisplayStateFromObject({
                object: (loadedFromState as any)[DISPLAY_FEATURE_KEY],
              })
            );
          }
          if (loadedFromState.hasOwnProperty(IMAGES_FEATURE_KEY)) {
            loadActions.push(
              loadImagesStateFromObject({
                object: (loadedFromState as any)[IMAGES_FEATURE_KEY],
              })
            );
          }
          return loadActions;
        } catch (e) {
          console.error(`Error loading config: ${e}`);
          return EMPTY;
        }
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
    private readonly localStorageService: LocalStorageService
  ) {}
}
