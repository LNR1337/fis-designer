import {DisplayConfigState} from "./display.state";
import {GaugeConfig, NeedleConfig} from "../models/configs";

const initialGaugeConfig: GaugeConfig = {
  startAngle: 90,
  angularRange: 180,
  lowerLimit: 0,
  upperLimit: 100,
}

const initialNeedleConfig1: NeedleConfig = {
  width: 47,
  height: 120,
  centerX: 23,
  centerY: 96,
  positionX: 109,
  positionY: 124,
  indicatorPositionX: 106,
  indicatorPositionY: 121,
}

const initialNeedleConfig2: NeedleConfig = {
  ...initialNeedleConfig1,
  positionX: 377,
  indicatorPositionX: 374
};

const initialNeedleConfig3: NeedleConfig = {
  ...initialNeedleConfig1,
  positionX: 645,
  indicatorPositionX: 642
};

/** Initial display state. */
export const initialDisplayConfigState: DisplayConfigState = {
  gauge1: initialGaugeConfig,
  gauge2: initialGaugeConfig,
  gauge3: initialGaugeConfig,
  needle1: initialNeedleConfig1,
  needle2: initialNeedleConfig2,
  needle3: initialNeedleConfig3,
};
