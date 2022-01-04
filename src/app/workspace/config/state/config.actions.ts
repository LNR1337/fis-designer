import {createAction, props} from '@ngrx/store';
import {ImageStateFieldsType} from '../../image-manager/state/images.state';
import {
  ConfigStateFieldsType,
  ConfigStateGaugeFieldsType,
  ConfigStateNeedleFieldsType,
  ConfigStateNumericalFieldsType,
  ConfigStateGeneralFieldsConfig,
} from './config.state';
import {GaugeConfig, NeedleConfig, NumericalConfig} from '../models/configs';

export const recalculateNeedleSize = createAction(
  '[Config] Recalculate needle size',
  props<{
    configStateNeedleField: ConfigStateNeedleFieldsType;
    previewStateImageField: ImageStateFieldsType;
  }>()
);

export const recalculateDigitsSize = createAction('[Config] Recalculate digits size');

export const changedGaugeConfig = createAction(
  '[Config] Changed gauge config',
  props<{
    config: GaugeConfig;
    displayConfigField: ConfigStateGaugeFieldsType;
  }>()
);

export const changedNeedleConfig = createAction(
  '[Config] Changed needle config',
  props<{
    config: NeedleConfig;
    displayConfigField: ConfigStateNeedleFieldsType;
  }>()
);

export const changedNumericalConfig = createAction(
  '[Config] Changed numerical config',
  props<{
    config: NumericalConfig;
    displayConfigField: ConfigStateNumericalFieldsType;
  }>()
);

export const changedGeneralFieldsConfig = createAction(
  '[Config] Changed general fields config',
  props<{
    config: ConfigStateGeneralFieldsConfig;
  }>()
);

export const enableHighlight = createAction(
  '[Config] Enable highlighting',
  props<{stateField: ConfigStateFieldsType}>()
);

export const disableHighlight = createAction('[Config] Disable highlighting');

export const loadConfigStateFromObject = createAction(
  '[Config] Load config state from object',
  props<{object: Object}>()
);
