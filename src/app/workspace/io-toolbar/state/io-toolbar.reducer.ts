import {createReducer, on} from '@ngrx/store';

import * as actions from './io-toolbar.actions';

export const IO_TOOLBAR_FEATURE_KEY = 'io-toolbar';
const initialState = {}

export const ioToolbarReducer = createReducer(
  initialState,
  on(actions.loadedExistingConfigNames, (state, {configNames}) => ({
    ...state,
    existingConfigNames: configNames,
  })),
);
