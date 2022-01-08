import {createReducer, on} from '@ngrx/store';

import * as actions from './config.actions';
import {initialConfigState} from './config.initial-state';
import {
  ConfigState,
  ConfigStateFields,
  ConfigStateFieldsBooleanSet,
  ConfigStateFieldsStringSet,
  ConfigStateFieldsNumericalSelectSet,
  ConfigStateFieldsNumericalSet,
  ConfigStateVisualFields,
} from './config.state';

export const CONFIG_FEATURE_KEY = 'config';

export const configReducer = createReducer(
  initialConfigState,
  on(
    actions.changedGaugeConfig,
    actions.changedNeedleConfig,
    actions.changedNumericalConfig,
    actions.changedTableConfig,
    (state, {config, displayConfigField}) => ({
      ...state,
      [displayConfigField]: config,
    })
  ),
  on(actions.changedGeneralFieldsConfig, (state, {config}) => ({
    ...state,
    ...(config as ConfigState), // TODO(pawelszydlo): type hack.
  })),
  on(actions.changeConfigName, (state, {name}) => ({
    ...state,
    configName: name,
  })),
  on(actions.loadConfigStateFromObject, (state, {maybeState, visualOnly}) => {
    const newState: Partial<ConfigState> = {};
    const fieldList = visualOnly ? ConfigStateVisualFields : ConfigStateFields;
    for (const fieldName of fieldList) {
      if (Object.prototype.hasOwnProperty.call(maybeState, fieldName)) {
        const value = maybeState[fieldName];
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
        if (ConfigStateFieldsStringSet.has(fieldName)) {
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
