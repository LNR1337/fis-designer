import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, exhaustMap, mergeMap, of, withLatestFrom} from 'rxjs';
import {loadDisplayStateFromObject} from '../../config/display/state/display.actions';
import {DISPLAY_FEATURE_KEY} from '../../config/display/state/display.reducer';
import {selectDisplayState} from '../../config/display/state/display.selectors';
import {PREVIEW_FEATURE_KEY} from '../../preview/state/preview.reducer';
import {selectPreviewState} from '../../preview/state/preview.selectors';
import {LocalStorageService} from '../../services/local-storage';
import {
  loadExistingConfigNames, loadExistingConfigNamesSuccess, loadStateFromStorage, saveStateToStorage,
} from './io-toolbar.actions';
import {Action, Store} from '@ngrx/store';


@Injectable()
export class IoToolbarEffects {
  /** Effect to save current state to local storage. */
  saveStateToLocalStorage = createEffect(() => this.actions$.pipe(ofType(saveStateToStorage),
    withLatestFrom(this.store.select(selectDisplayState)),
    withLatestFrom(this.store.select(selectPreviewState)),
    mergeMap(([[action, displayState], previewState]) => {
      const stateToSave = {
        [DISPLAY_FEATURE_KEY]: displayState,
        [PREVIEW_FEATURE_KEY]: previewState,
      };
      try {
        this.localStorageService.saveState(action.name, stateToSave);
      } catch (e) {
        console.error(`Error saving config: ${e}`);
      }
      return of(loadExistingConfigNames());
    }),
  ));

  /** Effect to load state from local storage. */
  loadStateFromStorage = createEffect(() => this.actions$.pipe(ofType(loadStateFromStorage),
    mergeMap((action) => {
      try {
        const loadedFromState = this.localStorageService.loadState(action.name);
        const loadActions: Action[] = [];
        if (loadedFromState.hasOwnProperty('display')) {
          loadActions.push(loadDisplayStateFromObject({object: (loadedFromState as any).display}));
        }
        return loadActions;
      } catch (e) {
        console.error(`Error loading config: ${e}`);
        return EMPTY;
      }
    }),
  ));

  /** Effect to load existing config names from local storage and emit loaded action. */
  loadExistingConfigNames = createEffect(() => this.actions$.pipe(ofType(loadExistingConfigNames),
    exhaustMap(() => {
      const configNames = this.localStorageService.getSavedNames();
      return [loadExistingConfigNamesSuccess({configNames})];
    }),
  ));

  constructor(private actions$: Actions, private readonly store: Store,
              private readonly localStorageService: LocalStorageService) {
  }
}
