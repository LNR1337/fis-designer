import {createFeatureSelector, createSelector} from '@ngrx/store';

import {DISPLAY_FEATURE_KEY} from './display.reducer';
import {
  DisplayConfigState,
  StateDisplayNeedleFieldsInterface,
  StateDisplayGaugeFieldsInterface
} from './display.state';
import {GaugeConfig, NeedleConfig} from "../models/configs";

const displayState = createFeatureSelector<DisplayConfigState>(DISPLAY_FEATURE_KEY);

/** Selects the needles' configs. */
export const selectNeedleConfigs = createSelector(
  displayState,
  state => ({
    needle1: state.needle1, needle2: state.needle2, needle3: state.needle3
  } as StateDisplayNeedleFieldsInterface<NeedleConfig>)
);

/** Selects the gauges' configs. */
export const selectGaugeConfigs = createSelector(
  displayState,
  state => ({
    gauge1: state.gauge1, gauge2: state.gauge2, gauge3: state.gauge3
  } as StateDisplayGaugeFieldsInterface<GaugeConfig>));
