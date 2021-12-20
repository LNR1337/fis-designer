import {createReducer, on} from '@ngrx/store';

import * as actions from './display.actions';
import {initialDisplayConfigState} from './display.initial-state';

export const DISPLAY_FEATURE_KEY = 'display';

export const displayReducer = createReducer(
  initialDisplayConfigState,
  on(actions.changedGaugeConfig, (state, {config, displayConfigField}) => ({
    ...state,
    [displayConfigField]: config,
  })),
  on(actions.changedNeedleConfig, (state, {config, displayConfigField}) => ({
    ...state,
    [displayConfigField]: config,
  })),
  on(actions.enableHighlight, (state, {stateField}) => ({
    ...state,
    activeHightlight: stateField,
  })),
  on(actions.disableHighlight, (state) => ({
    ...state,
    activeHightlight: undefined,
  })),
);
