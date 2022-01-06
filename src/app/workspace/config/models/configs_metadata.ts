import {ImageStateFieldsType} from '../../image-manager/state/images.state';
import {ConfigStateFieldsObject, ConfigStateNeedleFieldsObject} from '../state/config.state';
import {
  GaugeConfigFieldsObject,
  NeedleConfigFieldsObject,
  NumericalConfigFieldsObject,
  TableConfigFieldsObject,
  TableRowConfigFieldsObject,
} from './configs';

/** Metadata for config field display. */
export interface ConfigFieldMetadata {
  label?: string;
  hint?: string;
  min?: number;
  max?: number;
  hideSlider?: boolean;
  options?: Map<number, string>;
}

export const NEEDLE_DISPLAY_TO_PREVIEW_FIELD: ConfigStateNeedleFieldsObject<ImageStateFieldsType> =
  {
    needle1: 'needleImage1',
    needle2: 'needleImage2',
    needle3: 'needleImage3',
  };

// -------------------------- State fields --------------------------

/** Metadata for all config state fields. */
export const STATE_FIELDS_METADATA: ConfigStateFieldsObject<ConfigFieldMetadata> = {
  configName: {label: 'Config name'},
  // Gauges
  hideStatusBarOnGauge: {label: 'Hide status bar'},
  gauge1: {label: 'Left gauge'},
  gauge2: {label: 'Center gauge'},
  gauge3: {label: 'Right gauge'},
  // Needles.
  needle1: {label: 'Left needle'},
  needle2: {label: 'Center needle'},
  needle3: {label: 'Right needle'},
  // Tables.
  table1: {label: 'Table 1'},
  table2: {label: 'Table 2'},
  table3: {label: 'Table 3'},
  table4: {label: 'Table 4'},
  table5: {label: 'Table 5'},
  // Numerical gauges.
  numerical1: {label: 'Digital gauge 1'},
  numerical2: {label: 'Digital gauge 2'},
  numerical3: {label: 'Digital gauge 3'},
  numerical4: {label: 'Digital gauge 4'},
  numerical5: {label: 'Digital gauge 5'},
  numerical6: {label: 'Digital gauge 6'},
  numerical7: {label: 'Digital gauge 7'},
  numerical8: {label: 'Digital gauge 8'},
  numerical9: {label: 'Digital gauge 9'},
  numerical10: {label: 'Digital gauge 10'},
  // Digital gauges setup.
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
  // Tables setup.
  useTableBackgroundImage: {label: 'Use background image if provided'},
  tableBackgroundColor: {label: 'Background color'},
  tableFontColor: {label: 'Font color'},
  firstTable: {
    label: 'Initial table view',
    options: new Map<number, string>([
      [0, 'Table 1'],
      [1, 'Table 2'],
      [2, 'Table 3'],
      [3, 'Table 4'],
      [4, 'Table 5'],
    ]),
  },
  scrollAllTables: {
    label: 'Scroll through all tables',
    hint: 'Allow scrolling through all the tables. Otherwise, show just the initial one.',
  },
  hideStatusBarOnTable: {label: 'Hide status bar'},
  virtualCockpitFriendlyTables: {
    label: 'Adapt layout to virtual cockpit window',
    hint: 'Modify the table display to fit in a virtual cockpit window',
  },
  // General settings.
  language: {
    label: 'Language',
    options: new Map<number, string>([
      [0, 'English'],
      [1, 'German'],
    ]),
  },
  autostart: {
    label: 'Auto-start',
    options: new Map<number, string>([
      [0, 'Off'],
      [1, 'On'],
      [2, 'On with needle sweep'],
      [3, 'On with needle sweep (1 second delay)'],
      [4, 'On with needle sweep (2 seconds delay)'],
      [5, 'On with needle sweep (3 seconds delay)'],
      [6, 'On with needle sweep (4 seconds delay)'],
      [7, 'On with needle sweep (5 seconds delay)'],
    ]),
  },
  bluetooth: {
    label: 'Bluetooth',
    options: new Map<number, string>([
      [0, 'Auto-off'],
      [1, 'Always on'],
    ]),
  },
  car: {
    label: 'Car model',
    options: new Map<number, string>([
      [0, 'unknown'],
      [1, 'Audi A1 8X (05/2010 - )'],
      [2, 'Audi A4 8K (05/2009 - 08/2015)'],
      [3, 'Audi A5 8T (11/2008 - 06/2016)'],
      [4, 'Audi A6 4F'],
      [5, 'Audi Q5 8R (11/2008 - 2017)'],
      [6, 'Audi A8 4H (03/2010 - )'],
      [7, 'Audi Q3 8U (10/2011 - )'],
      [8, 'Audi A6 4G (04/2011 - 09/2014)'],
      [9, 'Audi A3 8V'],
      [10, 'Audi A6 4G (09/2014 - )'],
      [11, 'Seat Leon 5F'],
      [12, 'VW Passat B8'],
      [13, 'VW Golf Mk7'],
      [14, 'Audi TT 8S'],
      [15, 'VW Polo 6C'],
    ]),
  },
  useSteeringWheelRoller: {label: 'Control FIS-Control with steering wheel roller'},
  driveSelectReselect: {
    label: 'Reselect dynamic drive mode after ignition',
    hint: 'Only for RSQ3. Enables the exhaust flap.',
  },
  showEgtToCan: {
    label: 'Show EGT from ECUMaster EGT to CAN',
    hint: 'Show EGT reported by ECUMaster EGT-to-CAN in the lower left corner of the gauges.',
  },
  supportLowResolution: {
    label: 'Support low resolution display',
    hint: 'Change the table and notifications font to fit on a smaller screen.',
  },
  ignorePdc: {
    label: 'Do not hide while reversing',
    hint: 'Ignore reverse camera and parking distance control.',
  },
  useStarButton: {label: 'Operate using star button only', hint: 'For A3 8V and TT 8S.'},
  hideOnDriveSelectButton: {
    label: 'Hide when drive select button is pressed',
    hint: 'For A3 8V face-lift.',
  },
  hideOnMmiButton: {label: 'Hide when MMI button is pressed', hint: 'For A3 8V face-lift.'},
  externalCanWarning: {label: 'Send warning status to external CAN board'},
};

// -------------------------- Config fields --------------------------

export const GAUGE_FIELD_METADATA: GaugeConfigFieldsObject<ConfigFieldMetadata> = {
  startAngle: {label: 'Lower limit angle', min: 0, max: 360},
  angularRange: {label: 'Low to high angle', min: -360, max: 360},
  lowerLimit: {label: 'Value lower limit', min: -2147483, max: 2147483, hideSlider: true},
  upperLimit: {label: 'Value upper limit', min: -2147483, max: 2147483, hideSlider: true},
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
  measurementId: {label: 'Measurement value'},
  label: {label: 'Label'},
  unit: {label: 'Unit', hint: 'Enter *lambda* for the λ symbol.'},
  decimalPlaces: {label: 'Decimals', hint: 'Used only for digital gauge display.', min: 0, max: 3},
  factor: {
    label: 'Conversion',
    options: new Map<number, string>([
      [0, 'x 1'],
      [1, 'x 10'],
      [2, 'x 100'],
      [3, 'x 1000'],
      [4, '/ 10'],
      [5, '/ 100 (kPa to Bar)'],
      [6, '/ 1000 (hPa to Bar)'],
      [7, 'x 14.7 (Lambda to AFR)'],
      [8, 'Celsius to Fahrenheit'],
      [9, 'hPa/mbar to PSI'],
      [10, 'bar to PSI'],
      [11, 'kg/h to g/s'],
      [12, 'g/s to kg/h'],
      [13, 'm/s2 to g'],
      [14, 'g to m/s2'],
      [15, 'km/h to mph'],
      [16, 'L/100km to MPG (US)'],
      [17, 'L/100km to MPG (UK)'],
      [18, 'kW to PS'],
      [19, 'kW to BHP'],
      [20, 'Percent'],
      [21, '/ 60'],
      [22, '/ 3600'],
    ]),
  },
  calculationId: {
    label: 'Calculation',
    options: new Map<number, string>([
      [0, ''],
      [1, 'Boost pressure'],
      [2, 'Ambient pressure'],
      [3, 'Engine torque'],
      [4, 'RPM'],
    ]),
  },
  lowerWarning: {label: 'Lower warning'},
  upperWarning: {label: 'Upper warning'},
};
