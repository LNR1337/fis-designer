import {createAction, props} from '@ngrx/store';
import {
  StateDisplayGaugeFieldsType, StateDisplayNeedleFieldsType
} from "./display.state";
import {GaugeConfig, NeedleConfig} from "../models/configs";

export const recalculateNeedleSize = createAction(
  '[Config] Recalculate needle size',
  props<{needleField: StateDisplayNeedleFieldsType}>(),
);

export const changedGaugeConfig = createAction(
  '[Config] Changed gauge config',
  props<{config: GaugeConfig, displayConfigField: StateDisplayGaugeFieldsType}>(),
);

export const changedNeedleConfig = createAction(
  '[Config] Changed needle config',
  props<{config: NeedleConfig, displayConfigField: StateDisplayNeedleFieldsType}>(),
);
