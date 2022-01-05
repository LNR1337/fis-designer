import {saveAs} from 'file-saver';
import {
  convertBinaryToConfig,
  convertConfigToBinary,
} from '../../../assets/js/fis-control-binary-converter/config-converter';
import * as fisModels from '../../../assets/js/fis-control-binary-converter/config-model';
import {
  convertBackgrounds,
  convertNeedlesAndDigits,
} from '../../../assets/js/fis-control-binary-converter/image-converter';
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
import {base64ToArrayBuffer} from '../preview/utils';

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

function fisToNumericalGaugeConfig(fisNumerical: fisModels.NumericalGaugeConfig): NumericalConfig {
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

function numericalGaugeConfigToFis(config: NumericalConfig): fisModels.NumericalGaugeConfig {
  return {
    positionX: config.positionX!,
    positionY: config.positionY!,
    centered: !!config.centered,
  };
}

function gaugeAndNeedleConfigToFis(
  gaugeConfig: GaugeConfig,
  needleConfig: NeedleConfig
): fisModels.GaugeConfig {
  return {
    lowerLimit: gaugeConfig.lowerLimit!,
    upperLimit: gaugeConfig.upperLimit!,
    startAngle: gaugeConfig.startAngle!,
    scaleRange: gaugeConfig.angularRange!,
    needleWidth: needleConfig.width!,
    needleHeight: needleConfig.height!,
    needlePosX: needleConfig.positionX!,
    needlePosY: needleConfig.positionY!,
    needleCenterX: needleConfig.centerX!,
    needleCenterY: needleConfig.centerY!,
    indicatorPosX: needleConfig.indicatorPositionX!,
    indicatorPosY: needleConfig.indicatorPositionY!,
  };
}

function tableConfigToFis(tableConfig: TableConfig): fisModels.TableConfig {
  return {
    controlUnitIndex: tableConfig.controlUnitId!,
    rows: tableConfig.rows!.map(
      (row): fisModels.TableRowConfig => ({
        measurement: row.measurementId!,
        label: row.label!,
        unit: row.unit!,
        decimals: row.decimalPlaces!,
        factor: row.factor!,
        pressure: row.calculationId!,
        lowerWarning: row.lowerWarning!,
        upperWarning: row.upperWarning!,
      })
    ),
  };
}

export function loadCompoundStateFromBinary(binaryData: ArrayBuffer, name: string): CompoundState {
  const fisConfig = convertBinaryToConfig(binaryData);
  const configState: ConfigState = {
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
    virtualCockpitFriendlyTables: fisConfig.modsConfig.virtualCockpit,
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

export function saveConfigStateAsBinary(configState: ConfigState): ArrayBuffer {
  const config: fisModels.Config = {
    language: configState.language!,
    autostart: configState.autostart!,
    bluetooth: configState.bluetooth!,
    car: configState.car!,
    layout: configState.useBuiltInNumericalGauges ? 1 : 0,
    view1: configState.firstTable!,
    backgroundColor: configState.tableBackgroundColor!,
    fontColor: configState.tableFontColor!,
    modsConfig: {
      mfswRoller: !!configState.useSteeringWheelRoller,
      driveSelect: !!configState.driveSelectReselect,
      egtToCan: !!configState.showEgtToCan,
      halfResolution: !!configState.supportLowResolution,
      ignorePdc: !!configState.ignorePdc,
      scrollTables: !!configState.scrollAllTables,
      statusbarGauge: !!configState.hideStatusBarOnGauge,
      statusbarTable: !!configState.hideStatusBarOnTable,
      virtualCockpit: !!configState.virtualCockpitFriendlyTables,
      starButton: !!configState.useStarButton,
      texture: !!configState.useTableBackgroundImage,
      hideDrive: !!configState.hideOnDriveSelectButton,
      hideMmi: !!configState.hideOnMmiButton,
      alarm: !!configState.externalCanWarning,
    },
    digitsConfig: {
      width: configState.fontWidth!,
      height: configState.fontHeight!,
      dotWidth: configState.fontDotWidth!,
      spacing: configState.fontSpacing!,
      normalColor: configState.fontColor!,
      warningColor: configState.fontWarningColor!,
    },
    gaugeConfigs: [
      gaugeAndNeedleConfigToFis(configState.gauge1!, configState.needle1!),
      gaugeAndNeedleConfigToFis(configState.gauge2!, configState.needle2!),
      gaugeAndNeedleConfigToFis(configState.gauge3!, configState.needle3!),
    ],
    numericalGaugeConfigs: [
      numericalGaugeConfigToFis(configState.numerical1!),
      numericalGaugeConfigToFis(configState.numerical2!),
      numericalGaugeConfigToFis(configState.numerical3!),
      numericalGaugeConfigToFis(configState.numerical4!),
      numericalGaugeConfigToFis(configState.numerical5!),
      numericalGaugeConfigToFis(configState.numerical6!),
      numericalGaugeConfigToFis(configState.numerical7!),
      numericalGaugeConfigToFis(configState.numerical8!),
      numericalGaugeConfigToFis(configState.numerical9!),
      numericalGaugeConfigToFis(configState.numerical10!),
    ],
    tableConfigs: [
      tableConfigToFis(configState.table1!),
      tableConfigToFis(configState.table2!),
      tableConfigToFis(configState.table3!),
      tableConfigToFis(configState.table4!),
      tableConfigToFis(configState.table5!),
    ],
  };
  return convertConfigToBinary(config);
}

export function downloadCompoundStateAsBinary(compoundState: CompoundState, name: string) {
  const blob = new Blob([saveConfigStateAsBinary(compoundState[CONFIG_FEATURE_KEY])], {
    type: 'application/octet-steam',
  });
  saveAs(blob, `${name}.settings.dat`);
}

export function downloadBackgroundImagesAsBinary(imagesState: ImagesState, name: string) {
  if (!imagesState.backgroundImage) {
    throw new Error('Background image is required');
  }
  const data = convertBackgrounds(
    base64ToArrayBuffer(imagesState.backgroundImage),
    imagesState.tableBackgroundImage
      ? base64ToArrayBuffer(imagesState.tableBackgroundImage)
      : undefined
  );
  const blob = new Blob([data], {type: 'application/octet-steam'});
  saveAs(blob, `${name}.backgrounds.bin`);
}

export function downloadNeedleImagesAsBinary(imagesState: ImagesState, name: string) {
  if (!imagesState.needleImage1 || !imagesState.needleImage2 || !imagesState.needleImage3) {
    throw new Error('Needle images are required');
  }
  const data = convertNeedlesAndDigits(
    base64ToArrayBuffer(imagesState.needleImage1),
    base64ToArrayBuffer(imagesState.needleImage2),
    base64ToArrayBuffer(imagesState.needleImage3),
    imagesState.digit0 ? base64ToArrayBuffer(imagesState.digit0) : undefined,
    imagesState.digit1 ? base64ToArrayBuffer(imagesState.digit1) : undefined,
    imagesState.digit2 ? base64ToArrayBuffer(imagesState.digit2) : undefined,
    imagesState.digit3 ? base64ToArrayBuffer(imagesState.digit3) : undefined,
    imagesState.digit4 ? base64ToArrayBuffer(imagesState.digit4) : undefined,
    imagesState.digit5 ? base64ToArrayBuffer(imagesState.digit5) : undefined,
    imagesState.digit6 ? base64ToArrayBuffer(imagesState.digit6) : undefined,
    imagesState.digit7 ? base64ToArrayBuffer(imagesState.digit7) : undefined,
    imagesState.digit8 ? base64ToArrayBuffer(imagesState.digit8) : undefined,
    imagesState.digit9 ? base64ToArrayBuffer(imagesState.digit9) : undefined,
    imagesState.digitDot ? base64ToArrayBuffer(imagesState.digitDot) : undefined,
    imagesState.digitMinus ? base64ToArrayBuffer(imagesState.digitMinus) : undefined
  );
  const blob = new Blob([data], {type: 'application/octet-steam'});
  saveAs(blob, `${name}.needles.bin`);
}
