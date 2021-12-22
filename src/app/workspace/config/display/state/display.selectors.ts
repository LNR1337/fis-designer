import {createFeatureSelector, createSelector} from '@ngrx/store';

import {DISPLAY_FEATURE_KEY} from './display.reducer';
import {
  DisplayConfigState,
  DisplayStateNeedleFieldsObject,
  DisplayStateGaugeFieldsObject,
} from './display.state';
import {GaugeConfig, NeedleConfig} from '../models/configs';

/** Selector for the whole state. */
export const selectDisplayState = createFeatureSelector<DisplayConfigState>(DISPLAY_FEATURE_KEY);

/** Selects the needles' configs. */
export const selectNeedleConfigs = createSelector(
  selectDisplayState,
  state =>
    ({
      needle1: state.needle1,
      needle2: state.needle2,
      needle3: state.needle3,
    } as DisplayStateNeedleFieldsObject<NeedleConfig>)
);

/** Selects the gauges' configs. */
export const selectGaugeConfigs = createSelector(
  selectDisplayState,
  state =>
    ({
      gauge1: state.gauge1,
      gauge2: state.gauge2,
      gauge3: state.gauge3,
    } as DisplayStateGaugeFieldsObject<GaugeConfig>)
);

/** Selects currently highlighted config. */
export const selectHighlight = createSelector(selectDisplayState, state => state.activeHightlight);
