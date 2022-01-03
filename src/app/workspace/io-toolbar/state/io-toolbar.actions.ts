import {createAction, props} from '@ngrx/store';

export const saveStateToStorage = createAction(
  '[IoToolbar] Save state to local storage',
  props<{name: string}>()
);

export const loadStateFromStorage = createAction(
  '[IoToolbar] Load state from local storage',
  props<{name: string}>()
);

export const downloadStateAsJSON = createAction(
  '[IoToolbar] Save state to JSON file',
  props<{name: string}>()
);

export const downloadStateAsBinary = createAction(
  '[IoToolbar] Save state to binary file',
  props<{name: string}>()
);

export const loadStateFromBufferJSON = createAction(
  '[IoToolbar] Load state from JSON file array buffer',
  props<{loadedBuffer: ArrayBuffer}>()
);

export const loadedSerializedState = createAction(
  '[IoToolbar] A serialized state has been loaded',
  props<{loadedObject: Object}>()
);

export const loadExistingConfigNames = createAction(
  '[IoToolbar] Load existing config names from local storage'
);

export const loadExistingConfigNamesSuccess = createAction(
  '[IoToolbar] Load existing config names from local storage successful',
  props<{configNames: string[]}>()
);
