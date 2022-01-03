/** Names of state fields containing display settings. */
import {GaugeConfig, NeedleConfig, NumericalConfig} from '../models/configs';

// ------------- Field lists -------------

export const ConfigStateFields = [
  'gauge1',
  'gauge2',
  'gauge3',
  'needle1',
  'needle2',
  'needle3',
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
  'fontWidth',
  'fontHeight',
  'fontDotWidth',
  'fontSpacing',
  'fontColor',
  'fontWarningColor',
  'tableBackgroundColor',
  'tableFontColor',
  'useBuiltInNumericals',
] as const;

/** List of all config state fields holding gauge configs. */
export const ConfigStateGaugeFields = ['gauge1', 'gauge2', 'gauge3'] as const;

/** List of all config state fields holding needle configs. */
export const ConfigStateNeedleFields = ['needle1', 'needle2', 'needle3'] as const;

/** List of all config state fields holding needle configs. */
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

/** List of all config state fields holding setup values. */
export const ConfigStateSetupFields = [
  'fontWidth',
  'fontHeight',
  'fontDotWidth',
  'fontSpacing',
  'fontColor',
  'fontWarningColor',
  'useBuiltInNumericals',
] as const;

/** List of all config state fields holding numerical setup values. */
export const ConfigStateSetupFieldsNumerical = [
  'fontWidth',
  'fontHeight',
  'fontDotWidth',
  'fontSpacing',
] as const;

/** List of all config state fields holding color setup values. */
export const ConfigStateSetupFieldsColor = ['fontColor', 'fontWarningColor'] as const;

/** List of all config state fields holding boolean values. */
export const ConfigStateSetupFieldsBoolean = ['useBuiltInNumericals'] as const;

// ------------- Union types -------------

/** Type for all valid config state field names. */
export type ConfigStateFieldsType = typeof ConfigStateFields[number];

/** Type for all valid state field names holding gauge settings. */
export type ConfigStateGaugeFieldsType = typeof ConfigStateGaugeFields[number];

/** Type for all valid state field names holding needle settings. */
export type ConfigStateNeedleFieldsType = typeof ConfigStateNeedleFields[number];

/** Type for all valid state field names holding numerical settings. */
export type ConfigStateNumericalFieldsType = typeof ConfigStateNumericalFields[number];

/** Type for all valid state field names holding setup values. */
export type ConfigStateSetupFieldsType = typeof ConfigStateSetupFields[number];

// ------------- Object types -------------

/** Object type of state fields holding gauge settings. */
export type ConfigStateGaugeFieldsObject<T> = {
  [property in ConfigStateGaugeFieldsType]: T;
};

/** Object type of state fields holding needle settings. */
export type ConfigStateNeedleFieldsObject<T> = {
  [property in ConfigStateNeedleFieldsType]: T;
};

/** Object type of state fields holding numerical settings. */
export type ConfigStateNumericalFieldsObject<T> = {
  [property in ConfigStateNumericalFieldsType]: T;
};

/** Object type of state fields holding setup values. */
export type ConfigStateSetupFieldsObject<T> = {
  [property in ConfigStateSetupFieldsType]: T;
};

/** Object holding a part of state responsible for numerical setup. */
export type ConfigStateSetupFieldsConfig = ConfigStateSetupFieldsObject<string | number | boolean>;

/** Object type of all config state fields. */
export type ConfigStateFieldsObject<T> = {
  [property in ConfigStateFieldsType]: T;
};

/** Object type of some config state fields. */
export type PartialConfigStateFieldsObject<T> = Partial<ConfigStateFieldsObject<T>>;

// ------------- State -------------

/** Type of all valid types for config state fields. */
export type ValidConfigStateType = number | string | GaugeConfig | NumericalConfig | NeedleConfig;

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
  fontWidth?: number;
  fontHeight?: number;
  fontDotWidth?: number;
  fontSpacing?: number;
  fontColor?: string;
  fontWarningColor?: string;
  useBuiltInNumericals?: boolean;
  // Internal utility fields.
  activeHighlight?: ConfigStateFieldsType;
}
