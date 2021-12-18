import {DisplayStateGaugeFieldsInterface, DisplayStateNeedleFieldsInterface} from "../state/display.state";
import {CompleteGaugeConfigFields, CompleteNeedleConfigFields} from "./configs";

export const GAUGE_LABELS: DisplayStateGaugeFieldsInterface<string> = {
  gauge1: 'Left gauge',
  gauge2: 'Center gauge',
  gauge3: 'Right gauge',
}

export const GAUGE_FIELD_LABELS: CompleteGaugeConfigFields<string> = {
  startAngle: 'Lower limit angle',
  angularRange: 'Low to high angle',
  lowerLimit: 'Value lower limit',
  upperLimit: 'Value upper limit'
}

export const NEEDLE_LABELS: DisplayStateNeedleFieldsInterface<string> = {
  needle1: 'Left needle',
  needle2: 'Center needle',
  needle3: 'Right needle',
}

export const NEEDLE_FIELD_LABELS: CompleteNeedleConfigFields<string> = {
 width: 'Width',
 height: 'Height',
 centerX: 'Center X',
 centerY: 'Center Y',
 positionX: 'Position X',
 positionY: 'Position Y',
 indicatorPositionX: 'Indicator X',
 indicatorPositionY: 'Indicator Y',
}
