import {createAction, props} from '@ngrx/store';
import {CompoundState} from '../serialization-utils';

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

export const loadStateFromBufferBinary = createAction(
  '[IoToolbar] Load state from binary file array buffer',
  props<{loadedBuffer: ArrayBuffer; fileName: string}>()
);

export const loadedCompoundState = createAction(
  '[IoToolbar] A serialized state has been loaded',
  props<{compoundState: CompoundState}>()
);

export const loadExistingConfigNames = createAction(
  '[IoToolbar] Load existing config names from local storage'
);

export const loadExistingConfigNamesSuccess = createAction(
  '[IoToolbar] Load existing config names from local storage successful',
  props<{configNames: string[]}>()
);
