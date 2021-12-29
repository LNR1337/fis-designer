import {createFeatureSelector, createSelector} from '@ngrx/store';

import {DISPLAY_FEATURE_KEY} from './display.reducer';
import {
  DisplayConfigState,
  DisplayStateNeedleFieldsObject,
  DisplayStateGaugeFieldsObject,
  DisplayStateNumericalFieldsObject,
  DisplayStateSetupFieldsConfig,
} from './display.state';
import {GaugeConfig, NeedleConfig, NumericalConfig} from '../models/configs';

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

/** Selects the numerical configs. */
export const selectNumericalConfigs = createSelector(
  selectDisplayState,
  state =>
    ({
      numerical1: state.numerical1,
      numerical2: state.numerical2,
      numerical3: state.numerical3,
      numerical4: state.numerical4,
      numerical5: state.numerical5,
      numerical6: state.numerical6,
      numerical7: state.numerical7,
      numerical8: state.numerical8,
      numerical9: state.numerical9,
      numerical10: state.numerical10,
    } as DisplayStateNumericalFieldsObject<NumericalConfig>)
);

/** Selects setup values. */
export const selectSetupValues = createSelector(
  selectDisplayState,
  state =>
    ({
      fontWidth: state.fontWidth,
      fontHeight: state.fontHeight,
      fontDotWidth: state.fontDotWidth,
      fontSpacing: state.fontSpacing,
      fontColor: state.fontColor,
      fontWarningColor: state.fontWarningColor,
    } as DisplayStateSetupFieldsConfig)
);

/** Selects currently highlighted config. */
export const selectHighlight = createSelector(selectDisplayState, state => state.activeHightlight);
