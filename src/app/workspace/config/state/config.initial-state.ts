import {ConfigState} from './config.state';
import {GaugeConfig, NeedleConfig, NumericalConfig} from '../models/configs';

const initialGaugeConfig: GaugeConfig = {
  startAngle: 90,
  angularRange: 180,
  lowerLimit: 0,
  upperLimit: 100,
};

const initialNeedleConfig1: NeedleConfig = {
  width: 47,
  height: 120,
  centerX: 23,
  centerY: 96,
  positionX: 109,
  positionY: 124,
  indicatorPositionX: 106,
  indicatorPositionY: 121,
};

const initialNeedleConfig2: NeedleConfig = {
  ...initialNeedleConfig1,
  positionX: 377,
  indicatorPositionX: 374,
};

const initialNeedleConfig3: NeedleConfig = {
  ...initialNeedleConfig1,
  positionX: 645,
  indicatorPositionX: 642,
};

const initialNumericalConfig: NumericalConfig = {
  positionX: 0,
  positionY: 0,
  centered: false,
};

/** Initial config state. */
export const initialConfigState: ConfigState = {
  gauge1: initialGaugeConfig,
  gauge2: initialGaugeConfig,
  gauge3: initialGaugeConfig,
  needle1: initialNeedleConfig1,
  needle2: initialNeedleConfig2,
  needle3: initialNeedleConfig3,
  numerical1: initialNumericalConfig,
  numerical2: initialNumericalConfig,
  numerical3: initialNumericalConfig,
  numerical4: initialNumericalConfig,
  numerical5: initialNumericalConfig,
  numerical6: initialNumericalConfig,
  numerical7: initialNumericalConfig,
  numerical8: initialNumericalConfig,
  numerical9: initialNumericalConfig,
  numerical10: initialNumericalConfig,
  fontWidth: 0,
  fontHeight: 0,
  fontDotWidth: 0,
  fontSpacing: 0,
  fontColor: '#ffffff',
  fontWarningColor: '#ff0000',
  useBuiltInNumericals: false,
};
