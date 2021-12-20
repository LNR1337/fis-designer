// Gauges.

/** All valid field names of gauge config. */
export const GaugeConfigFields = [
  'lowerLimit', 'upperLimit', 'startAngle', 'angularRange',
] as const;

/** Type for all valid field names of gauge config. */
export type GaugeConfigFieldsType = typeof GaugeConfigFields[number];

/** Object type for holding data for every field in gauge config. */
export type GaugeConfigFieldsObject<T> = { [property in GaugeConfigFieldsType]: T };

/** Object type for holding data for some fields in gauge config. */
export type PartialGaugeConfigFieldsObject<T> = Partial<GaugeConfigFieldsObject<T>>;

/** Configuration of gauge display. */
export type GaugeConfig = PartialGaugeConfigFieldsObject<number>;

/** Helper function for getting absolute radian angles of min and max needle values. */
export function getAbsoluteNeedleAngleBounds(config: GaugeConfig): [number, number] {
  // FIS-Control's angle direction is reversed and translated by 90 degrees.
  let angleStartDeg = -90 - config.startAngle!;
  while (Math.abs(angleStartDeg) >= 360) {
    angleStartDeg = angleStartDeg % 360;
  }
  let angleEndDeg = angleStartDeg + config.angularRange!;
  while (Math.abs(angleEndDeg) >= 360) {
    angleEndDeg = angleEndDeg % 360;
  }
  // At this point angles are in correct angular coordinates, but are in degrees.
  return [angleStartDeg * Math.PI / 180, angleEndDeg * Math.PI / 180];
}

// Needles.

/** All valid field names of needle config. */
export const NeedleConfigFields = [
  'width', 'height', 'positionX', 'positionY', 'centerX', 'centerY', 'indicatorPositionX', 'indicatorPositionY'
] as const;

/** Type for all valid field names of needle config. */
export type NeedleConfigFieldsType = typeof NeedleConfigFields[number];

/** Object type for an object holding data for every field in needle config. */
export type NeedleConfigFieldsObject<T> = { [property in NeedleConfigFieldsType]: T };

/** Object type for an object holding data for some fields in needle config. */
export type PartialNeedleConfigFieldsObject<T> = Partial<NeedleConfigFieldsObject<T>>;

/** Configuration of needle display. */
export type NeedleConfig = PartialNeedleConfigFieldsObject<number>;

// Numerical.

/** All valid field names of numerical config. */
export const NumericalConfigFields = [
  'positionX', 'positionY', 'centered',
] as const;

/** Type for all valid field names of numerical config. */
export type NumericalConfigFieldsType = typeof NumericalConfigFields[number];

/** Object type for holding data for every field in numerical config. */
export type NumericalConfigFieldsObject<T> = { [property in NumericalConfigFieldsType]: T };

/** Object type for holding data for some fields in numerical config. */
export type PartialNumericalConfigFieldsObject<T> = Partial<NumericalConfigFieldsObject<T>>;

/** Configuration of numerical gauge display. */
export interface NumericalConfig extends PartialNumericalConfigFieldsObject<number | boolean> {
  positionX?: number;
  positionY?: number;
  centered?: boolean;
}
