import {createAction, props} from '@ngrx/store';
import {ImageStateFieldsType} from '../../image-manager/state/images.state';
import {
  ConfigStateGaugeFieldsType,
  ConfigStateNeedleFieldsType,
  ConfigStateNumericalFieldsType,
  ConfigStateGeneralFieldsConfig,
  ConfigStateTableFieldsType,
} from './config.state';
import {GaugeConfig, NeedleConfig, NumericalConfig, TableConfig} from '../models/configs';

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

export const changedTableConfig = createAction(
  '[Config] Changed table config',
  props<{
    config: TableConfig;
    displayConfigField: ConfigStateTableFieldsType;
  }>()
);

export const changedGeneralFieldsConfig = createAction(
  '[Config] Changed general fields config',
  props<{
    config: ConfigStateGeneralFieldsConfig;
  }>()
);

export const changeConfigName = createAction(
  '[Config] Change project name',
  props<{name: string}>()
);

export const loadConfigStateFromObject = createAction(
  '[Config] Load config state from object',
  props<{maybeState: any}>()
);
