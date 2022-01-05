import {saveAs} from 'file-saver';
import {convertBinaryToConfig} from '../../../assets/js/fis-control-binary-converter/config-converter';
import {NumericalGaugeConfig} from '../../../assets/js/fis-control-binary-converter/config-model';
import * as fisModels from '../../../assets/js/fis-control-binary-converter/config-model';
import {
  GaugeConfig,
  NeedleConfig,
  NumericalConfig,
  TableConfig,
  TableRowConfig,
} from '../config/models/configs';
import {CONFIG_FEATURE_KEY} from '../config/state/config.reducer';
import {ConfigState, ConfigStateFieldsObject} from '../config/state/config.state';
import {IMAGES_FEATURE_KEY} from '../image-manager/state/images.reducer';
import {ImagesState} from '../image-manager/state/images.state';

/** Object containing all states to be serialized. */
export interface CompoundState {
  [CONFIG_FEATURE_KEY]: ConfigState;
  [IMAGES_FEATURE_KEY]: ImagesState;
}

export function assertIsCompoundState(object: any): CompoundState {
  // TODO(pawelszydlo): P5: This could be more thorough.
  if (!object[CONFIG_FEATURE_KEY] || !object[IMAGES_FEATURE_KEY]) {
    throw new Error('Not a valid saved state object.');
  }
  return object;
}

/** Get compound state object. */
export function getCompoundState(
  configState: ConfigState,
  imagesState: ImagesState
): CompoundState {
  return {
    [CONFIG_FEATURE_KEY]: configState,
    [IMAGES_FEATURE_KEY]: imagesState,
  };
}

export function downloadCompoundStateAsJSON(compoundState: CompoundState, name: string) {
  const blob = new Blob([JSON.stringify(compoundState)], {type: 'application/json'});
  saveAs(blob, `${name}.fis-designer.json`);
}

export function loadCompoundStateFromJSON(rawJsonData: ArrayBuffer): CompoundState {
  const encoder = new TextDecoder('utf-8');
  return assertIsCompoundState(JSON.parse(encoder.decode(rawJsonData)));
}

function fisToGaugeConfig(fisGauge: fisModels.GaugeConfig): GaugeConfig {
  return {
    lowerLimit: fisGauge.lowerLimit,
    upperLimit: fisGauge.upperLimit,
    startAngle: fisGauge.startAngle,
    angularRange: fisGauge.scaleRange,
  };
}

function fisToNeedleConfig(fisGauge: fisModels.GaugeConfig): NeedleConfig {
  return {
    width: fisGauge.needleWidth,
    height: fisGauge.needleHeight,
    positionX: fisGauge.needlePosX,
    positionY: fisGauge.needlePosY,
    centerX: fisGauge.needleCenterX,
    centerY: fisGauge.needleCenterY,
    indicatorPositionX: fisGauge.indicatorPosX,
    indicatorPositionY: fisGauge.indicatorPosY,
  };
}

function fisToNumericalGaugeConfig(
  fisNumerical: fisModels.NumericalGaugeConfig
): NumericalGaugeConfig {
  return {
    positionX: fisNumerical.positionX,
    positionY: fisNumerical.positionY,
    centered: fisNumerical.centered,
  };
}

function fisToTableConfig(fisTable: fisModels.TableConfig): TableConfig {
  return {
    controlUnitId: fisTable.controlUnitIndex,
    rows: fisTable.rows.map(
      (fisRow): TableRowConfig => ({
        measurementId: fisRow.measurement,
        label: fisRow.label,
        unit: fisRow.unit,
        decimalPlaces: fisRow.decimals,
        factor: fisRow.factor,
        calculationId: fisRow.pressure,
        lowerWarning: fisRow.lowerWarning,
        upperWarning: fisRow.upperWarning,
      })
    ),
  };
}

export function loadCompoundStateFromBinary(binaryData: ArrayBuffer, name: string): CompoundState {
  const fisConfig = convertBinaryToConfig(binaryData);
  const configState: ConfigStateFieldsObject<any> = {
    gauge1: fisToGaugeConfig(fisConfig.gaugeConfigs[0]),
    gauge2: fisToGaugeConfig(fisConfig.gaugeConfigs[1]),
    gauge3: fisToGaugeConfig(fisConfig.gaugeConfigs[2]),
    needle1: fisToNeedleConfig(fisConfig.gaugeConfigs[0]),
    needle2: fisToNeedleConfig(fisConfig.gaugeConfigs[1]),
    needle3: fisToNeedleConfig(fisConfig.gaugeConfigs[2]),
    numerical1: fisToNumericalGaugeConfig(fisConfig.numericalGaugeConfigs[0]),
    numerical2: fisToNumericalGaugeConfig(fisConfig.numericalGaugeConfigs[1]),
    numerical3: fisToNumericalGaugeConfig(fisConfig.numericalGaugeConfigs[2]),
    numerical4: fisToNumericalGaugeConfig(fisConfig.numericalGaugeConfigs[3]),
    numerical5: fisToNumericalGaugeConfig(fisConfig.numericalGaugeConfigs[4]),
    numerical6: fisToNumericalGaugeConfig(fisConfig.numericalGaugeConfigs[5]),
    numerical7: fisToNumericalGaugeConfig(fisConfig.numericalGaugeConfigs[6]),
    numerical8: fisToNumericalGaugeConfig(fisConfig.numericalGaugeConfigs[7]),
    numerical9: fisToNumericalGaugeConfig(fisConfig.numericalGaugeConfigs[8]),
    numerical10: fisToNumericalGaugeConfig(fisConfig.numericalGaugeConfigs[9]),
    table1: fisToTableConfig(fisConfig.tableConfigs[0]),
    table2: fisToTableConfig(fisConfig.tableConfigs[1]),
    table3: fisToTableConfig(fisConfig.tableConfigs[2]),
    table4: fisToTableConfig(fisConfig.tableConfigs[3]),
    table5: fisToTableConfig(fisConfig.tableConfigs[4]),
    // Digital gauges settings.
    fontWidth: fisConfig.digitsConfig.width,
    fontHeight: fisConfig.digitsConfig.height,
    fontDotWidth: fisConfig.digitsConfig.dotWidth,
    fontSpacing: fisConfig.digitsConfig.spacing,
    fontColor: fisConfig.digitsConfig.normalColor,
    fontWarningColor: fisConfig.digitsConfig.warningColor,
    useBuiltInNumericalGauges: fisConfig.layout === 1,
    hideStatusBarOnGauge: fisConfig.modsConfig.statusbarGauge,
    // Table view.
    useTableBackgroundImage: fisConfig.modsConfig.texture,
    tableBackgroundColor: fisConfig.backgroundColor,
    tableFontColor: fisConfig.fontColor,
    firstTable: fisConfig.view1,
    scrollAllTables: fisConfig.modsConfig.scrollTables,
    hideStatusBarOnTable: fisConfig.modsConfig.statusbarTable,
    useVirtualCockpitLayout: fisConfig.modsConfig.virtualCockpit,
    // General settings.
    language: fisConfig.language,
    autostart: fisConfig.autostart,
    bluetooth: fisConfig.bluetooth,
    car: fisConfig.car,
    useSteeringWheelRoller: fisConfig.modsConfig.mfswRoller,
    driveSelectReselect: fisConfig.modsConfig.driveSelect,
    showEgtToCan: fisConfig.modsConfig.egtToCan,
    supportLowResolution: fisConfig.modsConfig.halfResolution,
    ignorePdc: fisConfig.modsConfig.ignorePdc,
    useStarButton: fisConfig.modsConfig.starButton,
    hideOnDriveSelectButton: fisConfig.modsConfig.hideDrive,
    hideOnMmiButton: fisConfig.modsConfig.hideMmi,
    externalCanWarning: fisConfig.modsConfig.alarm,
    // Internal utility fields.
    configName: name,
  };
  return getCompoundState(configState, {});
}
