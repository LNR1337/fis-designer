import {createAction, props} from '@ngrx/store';
import {
  DisplayStateFieldsType,
  DisplayStateGaugeFieldsType,
  DisplayStateNeedleFieldsType,
} from './display.state';
import {GaugeConfig, NeedleConfig} from '../models/configs';
import {PreviewStateImageFieldsType} from '../../../preview/state/preview.state';

export const recalculateNeedleSize = createAction(
  '[Config] Recalculate needle size',
  props<{
    displayStateNeedleField: DisplayStateNeedleFieldsType;
    previewStateImageField: PreviewStateImageFieldsType;
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
