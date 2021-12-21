import {createAction, props} from "@ngrx/store";

export const saveStateToStorage = createAction(
  '[IoToolbar] Save state to local storage',
  props<{name: string}>(),
);

export const loadStateFromStorage = createAction(
  '[IoToolbar] Load state from local storage',
  props<{name: string}>(),
);

export const loadExistingConfigNames = createAction(
  '[IoToolbar] Load existing config names from local storage');

export const loadedExistingConfigNames = createAction(
  '[IoToolbar] Loaded existing config names from local storage',
  props<{configNames: string[]}>(),
);
