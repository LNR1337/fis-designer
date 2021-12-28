import {ImageStateFieldsType} from '../../../image-manager/state/images.state';
import {
  DisplayStateGaugeFieldsObject,
  DisplayStateNeedleFieldsObject,
  DisplayStateNumericalFieldsObject,
} from '../state/display.state';
import {
  GaugeConfigFieldsObject,
  NeedleConfigFieldsObject,
  NumericalConfigFieldsObject,
} from './configs';

export interface ConfigFieldMetadata {
  label?: string;
  hint?: string;
  min?: number;
  max?: number;
}

export const GAUGE_LABELS: DisplayStateGaugeFieldsObject<string> = {
  gauge1: 'Left gauge',
  gauge2: 'Center gauge',
  gauge3: 'Right gauge',
};

export const NEEDLE_LABELS: DisplayStateNeedleFieldsObject<string> = {
  needle1: 'Left needle',
  needle2: 'Center needle',
  needle3: 'Right needle',
};

export const NUMERICAL_LABELS: DisplayStateNumericalFieldsObject<string> = {
  numerical1: 'Numerical gauge 1',
  numerical2: 'Numerical gauge 2',
  numerical3: 'Numerical gauge 3',
  numerical4: 'Numerical gauge 4',
  numerical5: 'Numerical gauge 5',
  numerical6: 'Numerical gauge 6',
  numerical7: 'Numerical gauge 7',
  numerical8: 'Numerical gauge 8',
  numerical9: 'Numerical gauge 9',
  numerical10: 'Numerical gauge 10',
};

export const NEEDLE_DISPLAY_TO_PREVIEW_FIELD: DisplayStateNeedleFieldsObject<ImageStateFieldsType> =
  {
    needle1: 'needleImage1',
    needle2: 'needleImage2',
    needle3: 'needleImage3',
  };

export const GAUGE_FIELD_METADATA: GaugeConfigFieldsObject<ConfigFieldMetadata> = {
  startAngle: {label: 'Lower limit angle', min: 0, max: 360},
  angularRange: {label: 'Low to high angle', min: -360, max: 360},
  lowerLimit: {label: 'Value lower limit'},
  upperLimit: {label: 'Value upper limit'},
};

export const NUMERICAL_FIELD_METADATA: NumericalConfigFieldsObject<ConfigFieldMetadata> = {
  positionX: {label: 'Position X', min: 0, max: 799, hint: 'Set to 0 to disable gauge.'},
  positionY: {label: 'Position Y', min: 0, max: 479, hint: 'Set to 0 to disable gauge.'},
  centered: {
    label: 'Centered',
    hint:
      'Center gauge on the X position. Otherwise, the' +
      " position is the gauge's top right corner.",
  },
};

export const NEEDLE_FIELD_METADATA: NeedleConfigFieldsObject<ConfigFieldMetadata> = {
  width: {label: 'Width', hint: 'Has to match image width.'},
  height: {label: 'Height', hint: 'Has to match image height.'},
  centerX: {
    label: 'Center X',
    min: -200,
    max: 200,
    hint: 'Relative to position.',
  },
  centerY: {
    label: 'Center Y',
    min: -200,
    max: 200,
    hint: 'Relative to position.',
  },
  positionX: {label: 'Position X', min: 0, max: 799},
  positionY: {label: 'Position Y', min: 0, max: 479},
  indicatorPositionX: {
    label: 'Indicator X',
    hint: 'Set to 0 to disable indicator.',
    min: 0,
    max: 799,
  },
  indicatorPositionY: {
    label: 'Indicator Y',
    hint: 'Set to 0 to disable indicator.',
    min: 0,
    max: 479,
  },
};
