import {createReducer, on} from '@ngrx/store';

import * as actions from './config.actions';
import {initialConfigState} from './config.initial-state';
import {ConfigState} from './config.state';

export const CONFIG_FEATURE_KEY = 'config';

export const configReducer = createReducer(
  initialConfigState,
  on(
    actions.changedGaugeConfig,
    actions.changedNeedleConfig,
    actions.changedNumericalConfig,
    (state, {config, displayConfigField}) => ({
      ...state,
      [displayConfigField]: config,
    })
  ),
  on(actions.changedGeneralFieldsConfig, (state, {config}) => ({
    ...state,
    ...(config as ConfigState), // TODO(pawelszydlo): type hack.
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
  on(actions.loadConfigStateFromObject, (state, {object}) => ({
    ...state,
    ...object,
  }))
);
