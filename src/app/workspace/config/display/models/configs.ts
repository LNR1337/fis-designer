// Gauges.

/** All valid field names of gauge config. */
export const GaugeConfigFields = [
  'startAngle', 'angularRange', 'lowerLimit', 'upperLimit'
] as const;

/** Type for all valid field names of gauge config. */
export type GaugeConfigFieldsType = typeof GaugeConfigFields[number];

/** Interface type for an object holding data for every field in gauge config. */
export type GaugeConfigFieldsInterface<T> = { [property in GaugeConfigFieldsType]: T };

/** Interface type for an object holding data for some fields in gauge config. */
export type PartialGaugeConfigFieldsInterface<T> = Partial<GaugeConfigFieldsInterface<T>>;

/** Configuration of gauge display. */
export type GaugeConfig = PartialGaugeConfigFieldsInterface<number>;

// Needles.

/** All valid field names of needle config. */
export const NeedleConfigFields = [
  'width', 'height', 'centerX', 'centerY', 'positionX', 'positionY', 'indicatorPositionX', 'indicatorPositionY'
] as const;

/** Type for all valid field names of needle config. */
export type NeedleConfigFieldsType = typeof NeedleConfigFields[number];

/** Interface type for an object holding data for every field in needle config. */
export type NeedleConfigFieldsInterface<T> = { [property in NeedleConfigFieldsType]: T };

/** Interface type for an object holding data for some fields in needle config. */
export type PartialNeedleConfigFieldsInterface<T> = Partial<NeedleConfigFieldsInterface<T>>;

/** Configuration of needle display. */
export type NeedleConfig = PartialNeedleConfigFieldsInterface<number>;

// Numerical.

/** All valid field names of numerical config. */
export const NumericalConfigFields = [
  'positionX', 'positionY', 'centered',
] as const;

/** Type for all valid field names of numerical config. */
export type NumericalConfigFieldsType = typeof NumericalConfigFields[number];

/** Interface type for an object holding data for every field in numerical config. */
export type NumericalConfigFieldsInterface<T> = { [property in NumericalConfigFieldsType]: T };

/** Interface type for an object holding data for some fields in numerical config. */
export type PartialNumericalConfigFieldsInterface<T> = Partial<NumericalConfigFieldsInterface<T>>;

/** Configuration of numerical gauge display. */
export interface NumericalConfig extends PartialNumericalConfigFieldsInterface<number|boolean>{
  positionX?: number;
  positionY?: number;
  centered?: boolean;
}
