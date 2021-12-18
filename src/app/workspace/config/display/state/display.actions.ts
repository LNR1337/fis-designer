import {createAction, props} from '@ngrx/store';
import {
  DisplayStateGaugeFieldsType, DisplayStateNeedleFieldsType
} from "./display.state";
import {GaugeConfig, NeedleConfig} from "../models/configs";

export const recalculateNeedleSize = createAction(
  '[Config] Recalculate needle size',
  props<{needleField: DisplayStateNeedleFieldsType}>(),
);

export const changedGaugeConfig = createAction(
  '[Config] Changed gauge config',
  props<{config: GaugeConfig, displayConfigField: DisplayStateGaugeFieldsType}>(),
);

export const changedNeedleConfig = createAction(
  '[Config] Changed needle config',
  props<{config: NeedleConfig, displayConfigField: DisplayStateNeedleFieldsType}>(),
);
