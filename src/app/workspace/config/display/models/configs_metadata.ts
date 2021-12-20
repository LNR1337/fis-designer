import {
  DisplayStateGaugeFieldsObject,
  DisplayStateNeedleFieldsObject
} from "../state/display.state";
import {
  GaugeConfigFieldsObject,
  NeedleConfigFieldsObject,
} from "./configs";
import {PreviewStateImageFieldsType} from "../../../preview/state/preview.state";

export interface ConfigFieldMetadata {
  label?: string;
  hint?: string;
  min?: number,
  max?: number,
}

export const GAUGE_LABELS: DisplayStateGaugeFieldsObject<string> = {
  gauge1: 'Left gauge',
  gauge2: 'Center gauge',
  gauge3: 'Right gauge',
}

export const NEEDLE_LABELS: DisplayStateNeedleFieldsObject<string> = {
  needle1: 'Left needle',
  needle2: 'Center needle',
  needle3: 'Right needle',
}

export const NEEDLE_DISPLAY_TO_PREVIEW_FIELD: DisplayStateNeedleFieldsObject<PreviewStateImageFieldsType> = {
  needle1: 'needleImage1',
  needle2: 'needleImage2',
  needle3: 'needleImage3',
}

export const GAUGE_FIELD_METADATA: GaugeConfigFieldsObject<ConfigFieldMetadata> = {
  startAngle: {label: 'Lower limit angle', min: 0, max: 360},
  angularRange: {label: 'Low to high angle', min: -360, max: 360},
  lowerLimit: {label: 'Value lower limit'},
  upperLimit: {label: 'Value upper limit'},
}

export const NEEDLE_FIELD_METADATA: NeedleConfigFieldsObject<ConfigFieldMetadata> = {
  width: {label: 'Width', hint: 'Has to match image width.'},
  height: {label: 'Height', hint: 'Has to match image height.'},
  centerX: {label: 'Center X', min: -200, max: 200},
  centerY: {label: 'Center Y', min: -200, max: 200},
  positionX: {label: 'Position X', min: 0, max: 799},
  positionY: {label: 'Position Y', min: 0, max: 479},
  indicatorPositionX: {
    label: 'Indicator X',
    hint: 'Set to 0 to disable indicator.',
    min: 0,
    max: 799
  },
  indicatorPositionY: {
    label: 'Indicator Y',
    hint: 'Set to 0 to disable indicator.',
    min: 0,
    max: 479
  },
}

