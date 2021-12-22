import {createAction, props} from '@ngrx/store';
import {ImageStateFieldsType} from '../../../image-manager/state/images.state';
import {
  DisplayStateFieldsType,
  DisplayStateGaugeFieldsType,
  DisplayStateNeedleFieldsType,
} from './display.state';
import {GaugeConfig, NeedleConfig} from '../models/configs';

export const recalculateNeedleSize = createAction(
  '[Config] Recalculate needle size',
  props<{
    displayStateNeedleField: DisplayStateNeedleFieldsType;
    previewStateImageField: ImageStateFieldsType;
  }>()
);

export const changedGaugeConfig = createAction(
  '[Config] Changed gauge config',
  props<{
    config: GaugeConfig;
    displayConfigField: DisplayStateGaugeFieldsType;
  }>()
);

export const changedNeedleConfig = createAction(
  '[Config] Changed needle config',
  props<{
    config: NeedleConfig;
    displayConfigField: DisplayStateNeedleFieldsType;
  }>()
);

export const enableHighlight = createAction(
  '[Config] Enable highlighting',
  props<{stateField: DisplayStateFieldsType}>()
);

export const disableHighlight = createAction('[Config] Disable highlighting');

export const loadDisplayStateFromObject = createAction(
  '[Config] Load display state from object',
  props<{object: Object}>()
);
