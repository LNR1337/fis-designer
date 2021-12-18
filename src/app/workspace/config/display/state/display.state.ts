/** Names of state fields containing display settings. */
import {GaugeConfig, NeedleConfig, NumericalConfig} from "../models/configs";

export const DisplayStateFields = [
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
] as const;

/** Type for all valid display state field names. */
export type DisplayStateFieldsType = typeof DisplayStateFields[number];

/** List of all display state fields holding gauge configs. */
export const StateDisplayGaugeFields = ['gauge1', 'gauge2', 'gauge3'] as const;

/** List of all display state fields holding needle configs. */
export const StateDisplayNeedleFields = ['needle1', 'needle2', 'needle3'] as const;

/** Type for all valid state field names holding gauge settings. */
export type StateDisplayGaugeFieldsType = typeof StateDisplayGaugeFields[number];

/** Type for all valid state field names holding needle settings. */
export type StateDisplayNeedleFieldsType = typeof StateDisplayNeedleFields[number];

/** Interface type for an object of state fields holding gauge settings. */
export type StateDisplayGaugeFieldsInterface<T> = { [property in StateDisplayGaugeFieldsType]: T };

/** Interface type for an object of state fields holding needle settings. */
export type StateDisplayNeedleFieldsInterface<T> = { [property in StateDisplayNeedleFieldsType]: T };

/** Interface type for holding data for all display state fields. */
export type CompleteDisplayStateFields<T> = { [property in DisplayStateFieldsType]: T };

/** Interface type for holding data for some of the display state fields. */
export type PartialDisplayStateFields<T> = Partial<CompleteDisplayStateFields<T>>;

/** Type of all valid types for config state fields. */
export type ValidDisplayStateType = number | string | GaugeConfig | NumericalConfig | NeedleConfig;

/** State for the config module. */
export interface DisplayConfigState extends PartialDisplayStateFields<ValidDisplayStateType> {
  gauge1?: GaugeConfig,
  gauge2?: GaugeConfig,
  gauge3?: GaugeConfig,
  needle1?: NeedleConfig,
  needle2?: NeedleConfig,
  needle3?: NeedleConfig,
  numerical1?: NumericalConfig,
  numerical2?: NumericalConfig,
  numerical3?: NumericalConfig,
  numerical4?: NumericalConfig,
  numerical5?: NumericalConfig,
  numerical6?: NumericalConfig,
  numerical7?: NumericalConfig,
  numerical8?: NumericalConfig,
  numerical9?: NumericalConfig,
  numerical10?: NumericalConfig,
  fontWidth?: number,
  fontHeight?: number,
  fontDotWidth?: number,
  fontSpacing?: number,
  fontColor?: string,
  fontWarningColor?: string,
  tableBackgroundColor?: string,
  tableFontColor?: string,
}
