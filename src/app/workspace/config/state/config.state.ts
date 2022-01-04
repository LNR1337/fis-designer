/** Names of state fields containing display settings. */
import {GaugeConfig, NeedleConfig, NumericalConfig, TableConfig} from '../models/configs';

// -------------------------- Gauges --------------------------

/** List of all config state fields holding gauge configs. */
export const ConfigStateGaugeFields = ['gauge1', 'gauge2', 'gauge3'] as const;

/** Type for all valid state field names holding gauge settings. */
export type ConfigStateGaugeFieldsType = typeof ConfigStateGaugeFields[number];

/** Object type of state fields holding gauge settings. */
export type ConfigStateGaugeFieldsObject<T> = {
  [property in ConfigStateGaugeFieldsType]: T;
};

// -------------------------- Needles --------------------------

/** List of all config state fields holding needle configs. */
export const ConfigStateNeedleFields = ['needle1', 'needle2', 'needle3'] as const;

/** Type for all valid state field names holding needle settings. */
export type ConfigStateNeedleFieldsType = typeof ConfigStateNeedleFields[number];

/** Object type of state fields holding needle settings. */
export type ConfigStateNeedleFieldsObject<T> = {
  [property in ConfigStateNeedleFieldsType]: T;
};

// -------------------------- Numerical gauges --------------------------

/** List of all config state fields holding numerical configs. */
export const ConfigStateNumericalFields = [
  'numerical1',
  'numerical2',
  'numerical3',
  'numerical4',
  'numerical5',
  'numerical6',
  'numerical7',
  'numerical8',
  'numerical9',
  'numerical10',
] as const;

/** Type for all valid state field names holding numerical settings. */
export type ConfigStateNumericalFieldsType = typeof ConfigStateNumericalFields[number];

/** Object type of state fields holding numerical settings. */
export type ConfigStateNumericalFieldsObject<T> = {
  [property in ConfigStateNumericalFieldsType]: T;
};

// -------------------------- Tables --------------------------

/** List of all config state fields holding table configs. */
export const ConfigStateTableFields = ['table1', 'table2', 'table3', 'table4', 'table5'] as const;

/** Type for all valid state field names holding table settings. */
export type ConfigStateTableFieldsType = typeof ConfigStateTableFields[number];

/** Object type of state fields holding table settings. */
export type ConfigStateTableFieldsObject<T> = {
  [property in ConfigStateTableFieldsType]: T;
};

// -------------------------- General state fields --------------------------

export const ConfigStateGeneralGaugesFields = ['hideStatusBarOnGauge'] as const;
export const ConfigStateGeneralNumericalFields = [
  'fontWidth',
  'fontHeight',
  'fontDotWidth',
  'fontSpacing',
  'fontColor',
  'fontWarningColor',
  'useBuiltInNumericalGauges',
] as const;
export const ConfigStateGeneralTableFields = [
  'tableBackgroundColor',
  'tableFontColor',
  'useTableBackgroundImage',
  'hideStatusBarOnTable',
  'useVirtualCockpitLayout',
  'scrollAllTables',
  'firstTable',
] as const;
export const ConfigStateGeneralMiscFields = [
  'language',
  'autostart',
  'bluetooth',
  'car',
  'useSteeringWheelRoller',
  'driveSelect',
  'showEgtToCan',
  'supportLowResolution',
  'ignorePdc',
  'useStarButton',
  'hideOnDriveSelectButton',
  'hideOnMmiButton',
  'externalCanWarning',
] as const;

/** List of all config state fields holding simple values. */
export const ConfigStateGeneralFields = [
  ...ConfigStateGeneralGaugesFields,
  ...ConfigStateGeneralNumericalFields,
  ...ConfigStateGeneralTableFields,
  ...ConfigStateGeneralMiscFields,
] as const;

/** Type for all valid state field names holding simple values. */
export type ConfigStateGeneralFieldsType = typeof ConfigStateGeneralFields[number];

/** Object type of state fields holding simple values. */
export type ConfigStateGeneralFieldsObject<T> = {
  [property in ConfigStateGeneralFieldsType]: T;
};

/** Object holding a part of state responsible for simple setup values. */
export type ConfigStateGeneralFieldsConfig = ConfigStateGeneralFieldsObject<
  string | number | boolean
>;

// -------------------------- State --------------------------

export const ConfigStateFields = [
  ...ConfigStateGaugeFields,
  ...ConfigStateNeedleFields,
  ...ConfigStateNumericalFields,
  ...ConfigStateTableFields,
  ...ConfigStateGeneralFields,
  'configName',
] as const;

/** Set of all config state fields holding numerical values. */
export const ConfigStateFieldsNumericalSet = new Set([
  'fontWidth',
  'fontHeight',
  'fontDotWidth',
  'fontSpacing',
]);

/** Set of all config state fields holding numerical values coming from a select. */
export const ConfigStateFieldsNumericalSelectSet = new Set([
  'language',
  'autostart',
  'bluetooth',
  'car',
  'firstTable',
]);

/** Set of all config state fields holding string setup values. */
export const ConfigStateFieldsStringSet = new Set([
  'fontColor',
  'fontWarningColor',
  'tableBackgroundColor',
  'tableFontColor',
  'configName',
]);

/** Set of all config state fields holding boolean values. */
export const ConfigStateFieldsBooleanSet = new Set([
  'useBuiltInNumericalGauges',
  'useTableBackgroundImage',
  'useTableBackgroundImage',
  'useSteeringWheelRoller',
  'driveSelect',
  'showEgtToCan',
  'supportLowResolution',
  'ignorePdc',
  'scrollAllTables',
  'hideStatusBarOnGauge',
  'hideStatusBarOnTable',
  'useVirtualCockpitLayout',
  'useStarButton',
  'hideOnDriveSelectButton',
  'hideOnMmiButton',
  'externalCanWarning',
]);

/** Type for all valid config state field names. */
export type ConfigStateFieldsType = typeof ConfigStateFields[number];

/** Object type of all config state fields. */
export type ConfigStateFieldsObject<T> = {
  [property in ConfigStateFieldsType]: T;
};

/** State for the config module. */
export interface ConfigState {
  // TODO(pawelszydlo): somehow enforce fields in this interface.
  gauge1?: GaugeConfig;
  gauge2?: GaugeConfig;
  gauge3?: GaugeConfig;
  needle1?: NeedleConfig;
  needle2?: NeedleConfig;
  needle3?: NeedleConfig;
  numerical1?: NumericalConfig;
  numerical2?: NumericalConfig;
  numerical3?: NumericalConfig;
  numerical4?: NumericalConfig;
  numerical5?: NumericalConfig;
  numerical6?: NumericalConfig;
  numerical7?: NumericalConfig;
  numerical8?: NumericalConfig;
  numerical9?: NumericalConfig;
  numerical10?: NumericalConfig;
  table1?: TableConfig;
  table2?: TableConfig;
  table3?: TableConfig;
  table4?: TableConfig;
  table5?: TableConfig;
  // Digital gauges settings.
  fontWidth?: number;
  fontHeight?: number;
  fontDotWidth?: number;
  fontSpacing?: number;
  fontColor?: string;
  fontWarningColor?: string;
  useBuiltInNumericalGauges?: boolean;
  hideStatusBarOnGauge?: boolean;
  // Table view.
  useTableBackgroundImage?: boolean;
  tableBackgroundColor?: string;
  tableFontColor?: string;
  firstTable?: number;
  scrollAllTables?: boolean;
  hideStatusBarOnTable?: boolean;
  useVirtualCockpitLayout?: boolean;
  // General settings.
  language?: number;
  autostart?: number;
  bluetooth?: number;
  car?: number;
  useSteeringWheelRoller?: boolean;
  driveSelect?: boolean;
  showEgtToCan?: boolean;
  supportLowResolution?: boolean;
  ignorePdc?: boolean;
  useStarButton?: boolean;
  hideOnDriveSelectButton?: boolean;
  hideOnMmiButton?: boolean;
  externalCanWarning?: boolean;
  // Internal utility fields.
  configName?: string;
  activeHighlight?: ConfigStateFieldsType;
}
