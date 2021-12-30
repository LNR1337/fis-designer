import {createReducer, on} from '@ngrx/store';

import * as actions from './display.actions';
import {initialDisplayConfigState} from './display.initial-state';
import {DisplayConfigState} from './display.state';

export const DISPLAY_FEATURE_KEY = 'display';

export const displayReducer = createReducer(
  initialDisplayConfigState,
  on(
    actions.changedGaugeConfig,
    actions.changedNeedleConfig,
    actions.changedNumericalConfig,
    (state, {config, displayConfigField}) => ({
      ...state,
      [displayConfigField]: config,
    })
  ),
  on(actions.changedDisplaySetupConfig, (state, {config}) => ({
    ...state,
    ...(config as DisplayConfigState), // TODO(pawelszydlo): type hack.
  })),
  on(actions.enableHighlight, (state, {stateField}) => ({
    ...state,
    activeHighlight: stateField,
  })),
  on(actions.disableHighlight, state => ({
    ...state,
    activeHighlight: undefined,
  })),
  // TODO(pawelszydlo): do some data sanitization!
  on(actions.loadDisplayStateFromObject, (state, {object}) => ({
    ...state,
    ...object,
  }))
);
