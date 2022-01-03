import {ImageStateFieldsType} from '../../image-manager/state/images.state';
import {
  ConfigStateGaugeFieldsObject,
  ConfigStateNeedleFieldsObject,
  ConfigStateNumericalFieldsObject,
  ConfigStateDigitSetupFieldsObject,
  ConfigStateTableFieldsObject,
} from '../state/config.state';
import {
  GaugeConfigFieldsObject,
  NeedleConfigFieldsObject,
  NumericalConfigFieldsObject,
  TableConfigFieldsObject,
  TableRowConfigFieldsObject,
} from './configs';

export interface ConfigFieldMetadata {
  label?: string;
  hint?: string;
  min?: number;
  max?: number;
  hideSlider?: boolean;
}

export const NEEDLE_DISPLAY_TO_PREVIEW_FIELD: ConfigStateNeedleFieldsObject<ImageStateFieldsType> =
  {
    needle1: 'needleImage1',
    needle2: 'needleImage2',
    needle3: 'needleImage3',
  };

// -------------------------- State fields --------------------------

export const GAUGE_LABELS: ConfigStateGaugeFieldsObject<string> = {
  gauge1: 'Left gauge',
  gauge2: 'Center gauge',
  gauge3: 'Right gauge',
};

export const NEEDLE_LABELS: ConfigStateNeedleFieldsObject<string> = {
  needle1: 'Left needle',
  needle2: 'Center needle',
  needle3: 'Right needle',
};

export const TABLE_LABELS: ConfigStateTableFieldsObject<string> = {
  table1: 'Table 1',
  table2: 'Table 2',
  table3: 'Table 3',
  table4: 'Table 4',
  table5: 'Table 5',
};

export const NUMERICAL_LABELS: ConfigStateNumericalFieldsObject<string> = {
  numerical1: 'Digital gauge 1',
  numerical2: 'Digital gauge 2',
  numerical3: 'Digital gauge 3',
  numerical4: 'Digital gauge 4',
  numerical5: 'Digital gauge 5',
  numerical6: 'Digital gauge 6',
  numerical7: 'Digital gauge 7',
  numerical8: 'Digital gauge 8',
  numerical9: 'Digital gauge 9',
  numerical10: 'Digital gauge 10',
};

export const SETUP_FIELDS_METADATA: ConfigStateDigitSetupFieldsObject<ConfigFieldMetadata> = {
  fontWidth: {label: 'Digit width', min: 0, max: 255, hideSlider: true},
  fontHeight: {label: 'Digit height', min: 0, max: 255, hideSlider: true},
  fontDotWidth: {label: 'Dot width', min: 0, max: 255, hideSlider: true},
  fontSpacing: {
    label: 'Digit spacing',
    hint: 'Additional space between digits.',
    min: 0,
    max: 255,
    hideSlider: true,
  },
  fontColor: {label: 'Normal color'},
  fontWarningColor: {label: 'Warning color'},
  useBuiltInNumericalGauges: {
    label: 'GTI gauges',
    hint:
      'Show built in digital gauges in the middle of each analog gauge. These are' +
      ' visually independent from other digital gauges.',
  },
};

// -------------------------- Config fields --------------------------

export const GAUGE_FIELD_METADATA: GaugeConfigFieldsObject<ConfigFieldMetadata> = {
  startAngle: {label: 'Lower limit angle', min: 0, max: 360},
  angularRange: {label: 'Low to high angle', min: -360, max: 360},
  lowerLimit: {label: 'Value lower limit', min: -2147483.648, max: 2147483.64, hideSlider: true},
  upperLimit: {label: 'Value upper limit', min: -2147483.648, max: 2147483.64, hideSlider: true},
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
  width: {label: 'Width', hint: 'Has to match image width.', min: 0, max: 255, hideSlider: true},
  height: {label: 'Height', hint: 'Has to match image height.', min: 0, max: 255, hideSlider: true},
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

export const TABLE_FIELD_METADATA: TableConfigFieldsObject<ConfigFieldMetadata> = {
  controlUnitId: {label: 'ECU dataset'},
  rows: {label: 'Rows'},
};

export const TABLE_ROW_FIELD_METADATA: TableRowConfigFieldsObject<ConfigFieldMetadata> = {
  measurementId: {label: 'Measurement'},
  label: {label: 'Label'},
  unit: {label: 'unit', hint: 'Enter *lambda* for the λ symbol.'},
  decimalPlaces: {label: 'Decimals', hint: 'Used only for digital gauge display.'},
  factor: {label: 'Conversion'},
  pressureTag: {label: 'Boost calculation'},
  lowerWarning: {label: 'Lower warning'},
  upperWarning: {label: 'Upper warning'},
};
