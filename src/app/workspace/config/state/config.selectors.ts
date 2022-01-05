import {createFeatureSelector, createSelector} from '@ngrx/store';

import {CONFIG_FEATURE_KEY} from './config.reducer';
import {
  ConfigState,
  ConfigStateNeedleFieldsObject,
  ConfigStateGaugeFieldsObject,
  ConfigStateNumericalFieldsObject,
  ConfigStateGeneralFieldsConfig,
} from './config.state';
import {GaugeConfig, NeedleConfig, NumericalConfig} from '../models/configs';

/** Selector for the whole state. */
export const selectConfigState = createFeatureSelector<ConfigState>(CONFIG_FEATURE_KEY);

/** Selects the config's name */
export const selectConfigName = createSelector(selectConfigState, state => state.configName);

/** Selects the needles' configs. */
export const selectNeedleConfigs = createSelector(
  selectConfigState,
  (state): ConfigStateNeedleFieldsObject<NeedleConfig> => ({
    needle1: state.needle1!,
    needle2: state.needle2!,
    needle3: state.needle3!,
  })
);

/** Selects the gauges' configs. */
export const selectGaugeConfigs = createSelector(
  selectConfigState,
  (state): ConfigStateGaugeFieldsObject<GaugeConfig> => ({
    gauge1: state.gauge1!,
    gauge2: state.gauge2!,
    gauge3: state.gauge3!,
  })
);

/** Selects the numerical configs. */
export const selectNumericalConfigs = createSelector(
  selectConfigState,
  (state): ConfigStateNumericalFieldsObject<NumericalConfig> => ({
    numerical1: state.numerical1!,
    numerical2: state.numerical2!,
    numerical3: state.numerical3!,
    numerical4: state.numerical4!,
    numerical5: state.numerical5!,
    numerical6: state.numerical6!,
    numerical7: state.numerical7!,
    numerical8: state.numerical8!,
    numerical9: state.numerical9!,
    numerical10: state.numerical10!,
  })
);

/** Selects all general state values. */
export const selectGeneralFieldsConfig = createSelector(
  selectConfigState,
  (state): ConfigStateGeneralFieldsConfig => ({
    // Digital gauges settings.
    fontWidth: state.fontWidth!,
    fontHeight: state.fontHeight!,
    fontDotWidth: state.fontDotWidth!,
    fontSpacing: state.fontSpacing!,
    fontColor: state.fontColor!,
    fontWarningColor: state.fontWarningColor!,
    useBuiltInNumericalGauges: state.useBuiltInNumericalGauges!,
    hideStatusBarOnGauge: state.hideStatusBarOnGauge!,
    // Table view.
    hideStatusBarOnTable: state.hideStatusBarOnTable!,
    useTableBackgroundImage: state.useTableBackgroundImage!,
    tableBackgroundColor: state.tableBackgroundColor!,
    tableFontColor: state.tableFontColor!,
    firstTable: state.firstTable!,
    scrollAllTables: state.scrollAllTables!,
    virtualCockpitFriendlyTables: state.virtualCockpitFriendlyTables!,
    // General settings.
    language: state.language!,
    autostart: state.autostart!,
    bluetooth: state.bluetooth!,
    car: state.car!,
    useSteeringWheelRoller: state.useSteeringWheelRoller!,
    driveSelectReselect: state.driveSelectReselect!,
    showEgtToCan: state.showEgtToCan!,
    supportLowResolution: state.supportLowResolution!,
    ignorePdc: state.ignorePdc!,
    useStarButton: state.useStarButton!,
    hideOnDriveSelectButton: state.hideOnDriveSelectButton!,
    hideOnMmiButton: state.hideOnMmiButton!,
    externalCanWarning: state.externalCanWarning!,
  })
);

/** Selects currently highlighted config. */
export const selectHighlight = createSelector(selectConfigState, state => state.activeHighlight);
