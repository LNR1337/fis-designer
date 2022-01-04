import {createReducer, on} from '@ngrx/store';

import * as actions from './config.actions';
import {initialConfigState} from './config.initial-state';
import {
  ConfigState,
  ConfigStateFields,
  ConfigStateFieldsBooleanSet,
  ConfigStateFieldsColorSet,
  ConfigStateFieldsNumericalSelectSet,
  ConfigStateFieldsNumericalSet,
} from './config.state';

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
  on(actions.loadConfigStateFromObject, (state, {object}) => {
    const newState: {[k: string]: any} = {};
    for (const fieldName of ConfigStateFields) {
      if (object.hasOwnProperty(fieldName)) {
        const value = (object as any)[fieldName];
        // Sanitize simple types.
        if (
          ConfigStateFieldsNumericalSelectSet.has(fieldName) ||
          ConfigStateFieldsNumericalSet.has(fieldName)
        ) {
          if (typeof value !== 'number') {
            console.error(`Incorrect field "${fieldName}": expected number, got ${typeof value}.`);
            continue;
          }
        }
        if (ConfigStateFieldsBooleanSet.has(fieldName)) {
          if (typeof value !== 'boolean') {
            console.error(`Incorrect field "${fieldName}": expected boolean, got ${typeof value}.`);
            continue;
          }
        }
        if (ConfigStateFieldsColorSet.has(fieldName)) {
          if (typeof value !== 'string') {
            console.error(`Incorrect field "${fieldName}": expected string, got ${typeof value}.`);
            continue;
          }
        }
        // TODO(pawelszydlo): sanitize object types.
        newState[fieldName] = value;
      }
    }
    return {...state, ...newState};
  })
);
